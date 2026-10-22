import { SectionScreen } from '@/components/section-screen';

export default function TrainScreen() {
  return <SectionScreen content={{
    eyebrow: 'BUILD YOUR RHYTHM', title: 'Train', description: 'Thoughtful plans that meet you where you are.',
    featureLabel: 'UP NEXT · TODAY', featureTitle: 'Easy run', featureDetail: 'A relaxed effort to build endurance. Keep it conversational.', featureValue: '35 min · Easy',
    rows: [
      { title: 'Tempo intervals', detail: 'Tomorrow · 42 min', value: 'Hard', symbol: '↗' },
      { title: 'Recovery walk', detail: 'Saturday · 25 min', value: 'Easy', symbol: '⌁' },
      { title: 'Long run', detail: 'Sunday · 60 min', value: 'Steady', symbol: '◉' },
    ],
  }} />;
}
