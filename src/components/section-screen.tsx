import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WarmPalette } from '@/constants/theme';

const palette = WarmPalette;

export type ScreenContent = {
  eyebrow: string;
  title: string;
  description: string;
  featureLabel: string;
  featureTitle: string;
  featureDetail: string;
  featureValue: string;
  rows: { title: string; detail: string; value: string; symbol: string }[];
  showLogin?: boolean;
  accountEmail?: string;
  onSignOut?: () => void;
};

export function SectionScreen({ content }: { content: ScreenContent }) {
  return (
    <ThemedView style={styles.page}>
      <SafeAreaView edges={['top']} style={styles.safe}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <ThemedText style={styles.eyebrow}>{content.eyebrow}</ThemedText>
          <ThemedText style={styles.title}>{content.title}</ThemedText>
          <ThemedText style={styles.description}>{content.description}</ThemedText>
          {content.accountEmail ? (
            <View style={styles.accountEntry}>
              <View style={styles.loginAvatar}><ThemedText style={styles.loginAvatarText}>{content.accountEmail[0]?.toUpperCase() ?? 'A'}</ThemedText></View>
              <View style={styles.loginCopy}><ThemedText style={styles.loginTitle}>Signed in</ThemedText><ThemedText style={styles.loginDetail} numberOfLines={1}>{content.accountEmail}</ThemedText></View>
              <Pressable accessibilityRole="button" hitSlop={8} onPress={content.onSignOut} style={({ pressed }) => pressed && styles.pressed}>
                <ThemedText style={styles.signOutText}>Sign out</ThemedText>
              </Pressable>
            </View>
          ) : content.showLogin ? (
            <Link href="/login" asChild>
              <Pressable style={({ pressed }) => [styles.loginEntry, pressed && styles.pressed]}>
                <View style={styles.loginAvatar}><ThemedText style={styles.loginAvatarText}>A</ThemedText></View>
                <View style={styles.loginCopy}><ThemedText style={styles.loginTitle}>Sign in to your account</ThemedText><ThemedText style={styles.loginDetail}>Sync your progress across devices</ThemedText></View>
                <ThemedText style={styles.loginArrow}>→</ThemedText>
              </Pressable>
            </Link>
          ) : null}
          <View style={styles.feature}>
            <View style={styles.featureTop}><ThemedText style={styles.featureLabel}>{content.featureLabel}</ThemedText><ThemedText style={styles.spark}>✳</ThemedText></View>
            <ThemedText style={styles.featureTitle}>{content.featureTitle}</ThemedText>
            <ThemedText style={styles.featureDetail}>{content.featureDetail}</ThemedText>
            <View style={styles.featureBottom}><ThemedText style={styles.featureValue}>{content.featureValue}</ThemedText><View style={styles.button}><ThemedText style={styles.buttonText}>Explore  →</ThemedText></View></View>
          </View>
          <View style={styles.sectionHeading}><ThemedText style={styles.sectionTitle}>Made for your next step</ThemedText><ThemedText style={styles.more}>View all</ThemedText></View>
          <View style={styles.list}>
            {content.rows.map((row, i) => (
              <View key={row.title} style={styles.row}>
                <View style={[styles.icon, i % 2 === 1 && styles.iconAlt]}><ThemedText style={styles.iconText}>{row.symbol}</ThemedText></View>
                <View style={styles.rowCopy}><ThemedText style={styles.rowTitle}>{row.title}</ThemedText><ThemedText style={styles.rowDetail}>{row.detail}</ThemedText></View>
                <ThemedText style={styles.rowValue}>{row.value}</ThemedText>
              </View>
            ))}
          </View>
          <View style={styles.note}><ThemedText style={styles.noteMark}>✦</ThemedText><ThemedText style={styles.noteText}>Small steps add up. Keep showing up for yourself.</ThemedText></View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: palette.canvas }, safe: { flex: 1 },
  content: { paddingHorizontal: 22, paddingTop: 15, paddingBottom: 32, gap: 13, maxWidth: 560, width: '100%', alignSelf: 'center' },
  eyebrow: { color: palette.muted, fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  title: { color: palette.ink, fontSize: 34, lineHeight: 39, fontWeight: '700', letterSpacing: -1.2 },
  description: { color: palette.muted, fontSize: 13, lineHeight: 19, marginTop: -6, marginBottom: 5 },
  loginEntry: { flexDirection: 'row', alignItems: 'center', gap: 11, backgroundColor: palette.surface, borderRadius: 17, padding: 12, marginTop: -3 },
  accountEntry: { flexDirection: 'row', alignItems: 'center', gap: 11, backgroundColor: palette.surface, borderRadius: 17, padding: 12, marginTop: -3 },
  loginAvatar: { width: 40, height: 40, borderRadius: 14, backgroundColor: palette.accent, alignItems: 'center', justifyContent: 'center' },
  loginAvatarText: { color: palette.ink, fontSize: 15, fontWeight: '700' },
  loginCopy: { flex: 1, gap: 4 },
  loginTitle: { color: palette.ink, fontSize: 12, fontWeight: '700' },
  loginDetail: { color: palette.muted, fontSize: 10 },
  loginArrow: { color: palette.ink, fontSize: 17, fontWeight: '600', paddingHorizontal: 5 },
  signOutText: { color: palette.muted, fontSize: 10, fontWeight: '700' },
  pressed: { opacity: 0.75 },
  feature: { backgroundColor: palette.accent, borderRadius: 23, padding: 21, minHeight: 205 },
  featureTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  featureLabel: { color: palette.muted, fontSize: 9, fontWeight: '700', letterSpacing: 1.3 }, spark: { color: palette.ink, fontSize: 20 },
  featureTitle: { color: palette.ink, fontSize: 25, lineHeight: 30, fontWeight: '700', letterSpacing: -0.6, marginTop: 17 },
  featureDetail: { color: palette.muted, fontSize: 12, lineHeight: 18, maxWidth: 280, marginTop: 6 },
  featureBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 },
  featureValue: { color: palette.ink, fontSize: 13, fontWeight: '700' },
  button: { backgroundColor: palette.surface, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12 }, buttonText: { color: palette.ink, fontSize: 11, fontWeight: '700' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  sectionTitle: { color: palette.ink, fontSize: 16, fontWeight: '700' }, more: { color: palette.muted, fontSize: 11, fontWeight: '600' },
  list: { backgroundColor: palette.surface, borderRadius: 20, paddingHorizontal: 14 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, gap: 11, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: palette.border },
  icon: { width: 40, height: 40, borderRadius: 14, backgroundColor: palette.clay, alignItems: 'center', justifyContent: 'center' },
  iconAlt: { backgroundColor: palette.sand }, iconText: { color: palette.ink, fontSize: 17, fontWeight: '700' },
  rowCopy: { flex: 1, gap: 4 }, rowTitle: { color: palette.ink, fontSize: 12, fontWeight: '700' },
  rowDetail: { color: palette.muted, fontSize: 10 }, rowValue: { color: palette.ink, fontSize: 11, fontWeight: '700' },
  note: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 15, backgroundColor: palette.clay },
  noteMark: { color: palette.ink, fontSize: 14 }, noteText: { color: palette.muted, fontSize: 10, fontWeight: '500' },
});
