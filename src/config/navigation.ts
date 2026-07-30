export interface NavItem {
  id: string;
  icon: string;
  translationKey: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'step1', icon: 'bi-sliders', translationKey: 'nav.step1' },
  { id: 'step2', icon: 'bi-box-arrow-in-right', translationKey: 'nav.step2' },
  { id: 'step3', icon: 'bi-calculator', translationKey: 'nav.step3' },
  { id: 'step4', icon: 'bi-graph-up', translationKey: 'nav.step4' },
  { id: 'step5', icon: 'bi-file-earmark-bar-graph', translationKey: 'nav.step5' },
];