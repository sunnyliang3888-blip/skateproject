import { SectionScreen } from '@/components/section-screen';

export default function TraceScreen() {
  return <SectionScreen content={{
    eyebrow: 'TAKE THE SCENIC WAY', title: 'Trace', description: 'Discover routes, save your favorites, and follow your curiosity.',
    featureLabel: 'ROUTE OF THE WEEK', featureTitle: 'The river loop', featureDetail: 'A quiet, tree-lined path with a little room to wander.', featureValue: '5.2 km · Mostly flat',
    rows: [
      { title: 'Riverside greenway', detail: 'Popular nearby · Paved', value: '3.8 km', symbol: '⌖' },
      { title: 'Hilltop lookout', detail: 'Saved route · Trail', value: '6.4 km', symbol: '△' },
      { title: 'Parkland circuit', detail: 'Easy loop · Mixed', value: '2.1 km', symbol: '◌' },
    ],
  }} />;
}
