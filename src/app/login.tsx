import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WarmPalette } from '@/constants/theme';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notice, setNotice] = useState('');
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAuth() {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setNotice('Please enter your email and password.');
      return;
    }
    if (!isSupabaseConfigured) {
      setNotice('Add your Supabase URL and publishable key to .env to enable authentication.');
      return;
    }

    setIsSubmitting(true);
    setNotice('');
    try {
      if (mode === 'sign-up') {
        const { data, error } = await supabase.auth.signUp({ email: trimmedEmail, password });
        if (error) throw error;
        if (data.session) {
          router.replace('/');
        } else {
          setNotice('Check your email for a confirmation link, then come back to sign in.');
          setMode('sign-in');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password });
        if (error) throw error;
        router.replace('/');
      }
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ThemedView style={styles.page}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.topBar}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="返回上一页"
                hitSlop={10}
                onPress={() => router.back()}
                style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
                <ThemedText style={styles.backArrow}>‹</ThemedText>
              </Pressable>
              <ThemedText style={styles.topLabel}>YOUR RUNNING STORY</ThemedText>
              <View style={styles.topSpacer} />
            </View>

            <View style={styles.intro}>
              <View style={styles.brandMark}><ThemedText style={styles.brandGlyph}>✳</ThemedText></View>
              <ThemedText style={styles.eyebrow}>A LITTLE MORE YOU</ThemedText>
              <ThemedText style={styles.title}>{mode === 'sign-in' ? <>Welcome{'\n'}back.</> : <>Start your{'\n'}story.</>}</ThemedText>
              <ThemedText style={styles.subtitle}>{mode === 'sign-in' ? 'Sign in to keep your miles, plans, and progress together.' : 'Create an account to keep your miles, plans, and progress together.'}</ThemedText>
            </View>

            <View style={styles.form}>
              <View style={styles.fieldGroup}>
                <ThemedText style={styles.label}>EMAIL ADDRESS</ThemedText>
                <TextInput
                  accessibilityLabel="Email address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={(value) => { setEmail(value); setNotice(''); }}
                  placeholder="you@example.com"
                  placeholderTextColor={WarmPalette.muted}
                  returnKeyType="next"
                  style={styles.input}
                  textContentType="emailAddress"
                  value={email}
                />
              </View>

              <View style={styles.fieldGroup}>
                <View style={styles.labelRow}>
                  <ThemedText style={styles.label}>PASSWORD</ThemedText>
                  <Pressable hitSlop={8} onPress={() => setPasswordVisible((visible) => !visible)}>
                    <ThemedText style={styles.showPassword}>{passwordVisible ? 'HIDE' : 'SHOW'}</ThemedText>
                  </Pressable>
                </View>
                <TextInput
                  accessibilityLabel="Password"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  onChangeText={(value) => { setPassword(value); setNotice(''); }}
                  onSubmitEditing={handleAuth}
                  placeholder="Enter your password"
                  placeholderTextColor={WarmPalette.muted}
                  returnKeyType="done"
                  secureTextEntry={!passwordVisible}
                  style={styles.input}
                  textContentType="password"
                  value={password}
                />
              </View>

              <Pressable
                accessibilityRole="button"
                disabled={isSubmitting}
                onPress={handleAuth}
                style={({ pressed }) => [styles.submitButton, pressed && styles.pressed, isSubmitting && styles.disabled]}>
                <ThemedText style={styles.submitText}>{isSubmitting ? 'Please wait…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}</ThemedText>
                <ThemedText style={styles.submitArrow}>→</ThemedText>
              </Pressable>

              {notice ? <ThemedText accessibilityLiveRegion="polite" style={styles.notice}>{notice}</ThemedText> : null}

              <View style={styles.separator}><View style={styles.separatorLine} /><ThemedText style={styles.separatorText}>OR</ThemedText><View style={styles.separatorLine} /></View>

              <Pressable
                accessibilityRole="button"
                onPress={() => router.replace('/')}
                style={({ pressed }) => [styles.guestButton, pressed && styles.pressed]}>
                <ThemedText style={styles.guestText}>Continue as a guest</ThemedText>
              </Pressable>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => { setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in'); setNotice(''); }}
              style={({ pressed }) => [styles.modeSwitch, pressed && styles.pressed]}>
              <ThemedText style={styles.modeText}>{mode === 'sign-in' ? "Don't have an account? " : 'Already have an account? '}<ThemedText style={styles.footerStrong}>{mode === 'sign-in' ? 'Create one' : 'Sign in'}</ThemedText></ThemedText>
            </Pressable>
            <ThemedText style={styles.footer}>By continuing, you agree to our <ThemedText style={styles.footerStrong}>Terms</ThemedText> and <ThemedText style={styles.footerStrong}>Privacy Policy</ThemedText>.</ThemedText>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: WarmPalette.canvas },
  safeArea: { flex: 1 },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 25, paddingBottom: 22, maxWidth: 520, width: '100%', alignSelf: 'center' },
  topBar: { height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { width: 38, height: 38, borderRadius: 14, backgroundColor: WarmPalette.surface, alignItems: 'center', justifyContent: 'center' },
  backArrow: { color: WarmPalette.ink, fontSize: 28, lineHeight: 31, marginTop: -3 },
  topLabel: { color: WarmPalette.muted, fontSize: 9, fontWeight: '700', letterSpacing: 1.5 },
  topSpacer: { width: 38 },
  intro: { paddingTop: 31, paddingBottom: 24 },
  brandMark: { width: 42, height: 42, borderRadius: 15, backgroundColor: WarmPalette.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 23 },
  brandGlyph: { color: WarmPalette.ink, fontSize: 22 },
  eyebrow: { color: WarmPalette.muted, fontSize: 9, fontWeight: '700', letterSpacing: 1.7, marginBottom: 9 },
  title: { color: WarmPalette.ink, fontSize: 43, lineHeight: 44, fontWeight: '700', letterSpacing: -1.8 },
  subtitle: { color: WarmPalette.muted, fontSize: 13, lineHeight: 20, maxWidth: 290, marginTop: 11 },
  form: { gap: 17 },
  fieldGroup: { gap: 8 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: WarmPalette.muted, fontSize: 9, fontWeight: '700', letterSpacing: 1.2 },
  showPassword: { color: WarmPalette.ink, fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  input: { minHeight: 54, borderRadius: 15, paddingHorizontal: 15, backgroundColor: WarmPalette.surface, color: WarmPalette.ink, fontSize: 14, borderWidth: 1, borderColor: WarmPalette.border },
  submitButton: { minHeight: 54, borderRadius: 16, backgroundColor: WarmPalette.ink, paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 3 },
  submitText: { color: WarmPalette.surface, fontSize: 14, fontWeight: '700' },
  submitArrow: { color: WarmPalette.surface, fontSize: 18, fontWeight: '600', position: 'absolute', right: 18 },
  pressed: { opacity: 0.76 },
  notice: { color: WarmPalette.muted, fontSize: 11, lineHeight: 16, textAlign: 'center', marginTop: -8 },
  disabled: { opacity: 0.55 },
  separator: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 1 },
  separatorLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: WarmPalette.border },
  separatorText: { color: WarmPalette.muted, fontSize: 9, fontWeight: '700', letterSpacing: 1.2 },
  guestButton: { minHeight: 52, borderRadius: 16, borderWidth: 1, borderColor: WarmPalette.border, backgroundColor: WarmPalette.clay, alignItems: 'center', justifyContent: 'center' },
  guestText: { color: WarmPalette.ink, fontSize: 13, fontWeight: '700' },
  footer: { color: WarmPalette.muted, fontSize: 10, lineHeight: 16, textAlign: 'center', marginTop: 'auto', paddingTop: 28 },
  modeSwitch: { alignSelf: 'center', paddingVertical: 5 },
  modeText: { color: WarmPalette.muted, fontSize: 11 },
  footerStrong: { color: WarmPalette.ink, fontWeight: '700' },
});
