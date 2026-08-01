export interface NavItem {
  readonly id: string;
  readonly icon: string;
  readonly translationKey: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'step1', icon: 'bi-sliders', translationKey: 'nav.step1' },
  { id: 'step2', icon: 'bi-diagram-3', translationKey: 'nav.step2' },
  { id: 'step3', icon: 'bi-calculator', translationKey: 'nav.step3' },
  { id: 'step4', icon: 'bi-graph-up', translationKey: 'nav.step4' },
  { id: 'step5', icon: 'bi-file-earmark-bar-graph', translationKey: 'nav.step5' },
] as const;