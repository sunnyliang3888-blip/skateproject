import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Today</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="today" sf="sun.max" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="train">
        <NativeTabs.Trigger.Label>Train</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="fitness_center" sf="figure.run" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="trace">
        <NativeTabs.Trigger.Label>Trace</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="map" sf="map" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="gear">
        <NativeTabs.Trigger.Label>Gear</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="sports" sf="backpack" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="my">
        <NativeTabs.Trigger.Label>My</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="person" sf="person.crop.circle" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="login" hidden />
    </NativeTabs>
  );
}
