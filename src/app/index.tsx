import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { WarmPalette } from '@/constants/theme';
import { ThemedView } from '@/components/themed-view';

const ink = WarmPalette.ink;
const muted = WarmPalette.muted;
const green = WarmPalette.accent;

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <View style={styles.sectionTitle}>
      <ThemedText type="subtitle">{title}</ThemedText>
      {action ? <ThemedText style={styles.action}>{action}</ThemedText> : null}
    </View>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <ThemedText style={styles.statValue}>{value}</ThemedText>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
    </View>
  );
}

export default function TodayScreen() {
  return (
    <ThemedView style={styles.page}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.topline}>
            <View>
              <ThemedText style={styles.eyebrow}>THURSDAY, OCTOBER 22</ThemedText>
              <ThemedText style={styles.greeting}>Good morning, Alex</ThemedText>
            </View>
            <View style={styles.avatar}><ThemedText style={styles.avatarText}>A</ThemedText></View>
          </View>

          <View style={styles.hero}>
            <View style={styles.heroTop}>
              <View style={styles.pill}><View style={styles.dot} /><ThemedText style={styles.pillText}>YOUR DAILY PLAN</ThemedText></View>
              <ThemedText style={styles.heroMark}>✳</ThemedText>
            </View>
            <ThemedText style={styles.heroTitle}>Find your{ '\n' }steady.</ThemedText>
            <ThemedText style={styles.heroCopy}>An easy run to build your base and clear your head.</ThemedText>
            <View style={styles.heroBottom}>
              <View style={styles.planMeta}><ThemedText style={styles.metaNumber}>35</ThemedText><ThemedText style={styles.metaUnit}>MIN</ThemedText><View style={styles.metaDivider} /><ThemedText style={styles.metaNumber}>EASY</ThemedText></View>
              <View style={styles.startButton}><ThemedText style={styles.startText}>Start run  →</ThemedText></View>
            </View>
          </View>

          <SectionTitle title="Your week" action="Details  ↗" />
          <View style={styles.weekCard}>
            <View style={styles.weekHeader}><ThemedText style={styles.weekCaption}>WEEKLY DISTANCE</ThemedText><ThemedText style={styles.weekValue}>18.4 <ThemedText style={styles.weekUnit}>/ 25 km</ThemedText></ThemedText></View>
            <View style={styles.progressTrack}><View style={styles.progressFill} /></View>
            <View style={styles.days}>
              {['M','T','W','T','F','S','S'].map((day, i) => <View key={`${day}-${i}`} style={styles.day}><View style={[styles.dayDot, i < 3 && styles.dayDone, i === 3 && styles.dayCurrent]}><ThemedText style={[styles.dayMark, i < 3 && styles.dayMarkDone]}>{i < 3 ? '✓' : i === 3 ? '•' : ''}</ThemedText></View><ThemedText style={[styles.dayLabel, i === 3 && styles.dayLabelCurrent]}>{day}</ThemedText></View>)}
            </View>
          </View>

          <SectionTitle title="Recent activity" action="See all" />
          <View style={styles.activityCard}>
            <View style={styles.activityIcon}><ThemedText style={styles.activityGlyph}>↗</ThemedText></View>
            <View style={styles.activityCopy}><ThemedText style={styles.activityName}>Morning miles</ThemedText><ThemedText style={styles.activitySub}>Yesterday · River path</ThemedText></View>
            <View style={styles.activityDistance}><ThemedText style={styles.distanceValue}>5.2</ThemedText><ThemedText style={styles.distanceUnit}>KM</ThemedText></View>
          </View>

          <View style={styles.statsRow}><Stat value="24.8 km" label="THIS WEEK" /><View style={styles.statsDivider} /><Stat value="4h 12m" label="TIME MOVING" /><View style={styles.statsDivider} /><Stat value="6" label="DAY STREAK" /></View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: WarmPalette.canvas },
  safeArea: { flex: 1 },
  content: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 28, gap: 18, maxWidth: 560, width: '100%', alignSelf: 'center' },
  topline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  eyebrow: { color: muted, fontSize: 10, fontWeight: '700', letterSpacing: 1.6, marginBottom: 6 },
  greeting: { color: ink, fontSize: 24, lineHeight: 29, fontWeight: '700', letterSpacing: -0.7 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: WarmPalette.clay, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: ink, fontSize: 15, fontWeight: '700' },
  hero: { backgroundColor: WarmPalette.accent, borderRadius: 24, padding: 22, minHeight: 250, overflow: 'hidden' },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20, backgroundColor: WarmPalette.surface },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: green },
  pillText: { color: WarmPalette.muted, fontSize: 9, fontWeight: '700', letterSpacing: 1.2 },
  heroMark: { color: green, fontSize: 24 },
  heroTitle: { color: ink, fontSize: 39, lineHeight: 40, fontWeight: '700', letterSpacing: -1.5, marginTop: 19 },
  heroCopy: { color: WarmPalette.muted, fontSize: 13, lineHeight: 19, maxWidth: 250, marginTop: 8 },
  heroBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 },
  planMeta: { flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  metaNumber: { color: ink, fontSize: 15, fontWeight: '700' },
  metaUnit: { color: WarmPalette.muted, fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  metaDivider: { width: 1, height: 15, backgroundColor: WarmPalette.sand, marginHorizontal: 6, alignSelf: 'center' },
  startButton: { backgroundColor: green, borderRadius: 14, paddingHorizontal: 15, paddingVertical: 12 },
  startText: { color: ink, fontSize: 12, fontWeight: '700' },
  sectionTitle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  action: { color: muted, fontSize: 12, fontWeight: '600' },
  weekCard: { backgroundColor: WarmPalette.surface, borderRadius: 20, padding: 17, gap: 13 },
  weekHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  weekCaption: { color: muted, fontSize: 9, fontWeight: '700', letterSpacing: 1.1 },
  weekValue: { color: ink, fontSize: 15, fontWeight: '700' },
  weekUnit: { color: muted, fontSize: 11, fontWeight: '500' },
  progressTrack: { height: 6, backgroundColor: WarmPalette.sand, borderRadius: 3, overflow: 'hidden' },
  progressFill: { width: '74%', height: '100%', backgroundColor: WarmPalette.accent, borderRadius: 3 },
  days: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 1 },
  day: { alignItems: 'center', gap: 6 },
  dayDot: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: WarmPalette.sand, alignItems: 'center', justifyContent: 'center' },
  dayDone: { backgroundColor: ink, borderColor: ink },
  dayCurrent: { backgroundColor: green, borderColor: green },
  dayMark: { color: WarmPalette.muted, fontSize: 11, fontWeight: '700' },
  dayMarkDone: { color: WarmPalette.surface },
  dayLabel: { color: WarmPalette.muted, fontSize: 10, fontWeight: '600' },
  dayLabelCurrent: { color: ink },
  activityCard: { backgroundColor: WarmPalette.surface, borderRadius: 18, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 12 },
  activityIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: WarmPalette.clay, alignItems: 'center', justifyContent: 'center' },
  activityGlyph: { color: WarmPalette.ink, fontSize: 21, fontWeight: '700' },
  activityCopy: { flex: 1, gap: 4 },
  activityName: { color: ink, fontSize: 13, fontWeight: '700' },
  activitySub: { color: muted, fontSize: 10 },
  activityDistance: { alignItems: 'flex-end', gap: 2 },
  distanceValue: { color: ink, fontSize: 17, fontWeight: '700' },
  distanceUnit: { color: muted, fontSize: 8, fontWeight: '700', letterSpacing: 1 },
  statsRow: { backgroundColor: WarmPalette.clay, borderRadius: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 14 },
  stat: { alignItems: 'center', gap: 4, flex: 1 },
  statValue: { color: ink, fontSize: 13, fontWeight: '700' },
  statLabel: { color: muted, fontSize: 8, fontWeight: '700', letterSpacing: 0.7 },
  statsDivider: { width: 1, height: 25, backgroundColor: WarmPalette.sand },
});
