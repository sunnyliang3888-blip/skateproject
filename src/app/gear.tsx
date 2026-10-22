import { SectionScreen } from '@/components/section-screen';

export default function GearScreen() {
  return <SectionScreen content={{
    eyebrow: 'READY FOR THE MILES', title: 'Gear', description: 'Keep track of the kit that carries you forward.',
    featureLabel: 'SHOE CHECK', featureTitle: 'Time for a fresh pair?', featureDetail: 'Your daily trainers are getting close to their next milestone.', featureValue: '468 / 500 km',
    rows: [
      { title: 'Daily trainers', detail: 'Added Aug 14 · Road', value: '93%', symbol: '◒' },
      { title: 'Trail shoes', detail: 'Added Sep 02 · Trail', value: '142 km', symbol: '△' },
      { title: 'GPS watch', detail: 'Last synced today', value: 'Ready', symbol: '◷' },
    ],
  }} />;
}
