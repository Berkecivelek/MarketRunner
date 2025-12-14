import type { BibiAnimation, BibiPosition } from '../components/BibiCharacter';
import type { ArrowDirection, SpeechBubblePosition } from '../components/BibiSpeechBubble';

export type TutorialStepId =
  | 'ORDER_WELCOME'
  | 'ORDER_EXPLAIN'
  | 'ORDER_START_BUTTON'
  | 'GAMEPLAY_COLLECT'
  | 'GAMEPLAY_CART'
  | 'GAMEPLAY_COMPLETE'
  | 'CHECKOUT_SCAN'
  | 'CHECKOUT_PACK'
  | 'LEVEL_COMPLETE';

export interface TutorialStep {
  id: TutorialStepId;
  screen: 'Order' | 'GamePlay' | 'Checkout' | 'LevelResult';
  message: string;
  bibiPosition: BibiPosition;
  bibiAnimation: BibiAnimation;
  speechBubblePosition: SpeechBubblePosition;
  arrowDirection: ArrowDirection;
  highlight?: string; // Highlight edilecek element ID'si
  showNextButton?: boolean;
  autoAdvance?: boolean; // Otomatik ilerleme (saniye)
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'ORDER_WELCOME',
    screen: 'Order',
    message: 'MERHABA! BEN BİBİ, SENİN MARKET REHBERİN!',
    bibiPosition: 'left',
    bibiAnimation: 'waving',
    speechBubblePosition: 'top',
    arrowDirection: 'down',
    showNextButton: true,
  },
  {
    id: 'ORDER_EXPLAIN',
    screen: 'Order',
    message: 'Level 1\'deyiz, bu bizim için basit! Şimdi Süt Ürünleri Reyonuna gidip süt ürününe tıkla ve sepete yolla!',
    bibiPosition: 'left',
    bibiAnimation: 'pointing',
    speechBubblePosition: 'top',
    arrowDirection: 'down',
    highlight: 'orderList',
    showNextButton: true,
  },
  {
    id: 'ORDER_START_BUTTON',
    screen: 'Order',
    message: 'Başla butonuna tıkla!',
    bibiPosition: 'left',
    bibiAnimation: 'pointing',
    speechBubblePosition: 'top',
    arrowDirection: 'down',
    highlight: 'startButton',
    showNextButton: false,
  },
  {
    id: 'GAMEPLAY_COLLECT',
    screen: 'GamePlay',
    message: 'Ürünleri hızla topla!',
    bibiPosition: 'left',
    bibiAnimation: 'pointing',
    speechBubblePosition: 'top',
    arrowDirection: 'down',
    highlight: 'firstProduct',
    showNextButton: true,
  },
  {
    id: 'GAMEPLAY_CART',
    screen: 'GamePlay',
    message: 'Doğru ürüne tıkla, sepete eklenecek!',
    bibiPosition: 'left',
    bibiAnimation: 'thumbs-up',
    speechBubblePosition: 'top',
    arrowDirection: 'down',
    highlight: 'cartButton',
    showNextButton: true,
  },
  {
    id: 'GAMEPLAY_COMPLETE',
    screen: 'GamePlay',
    message: 'Süper! Sipariş hazır, şimdi siparişi tamamla butonuna tıkla!',
    bibiPosition: 'left',
    bibiAnimation: 'thumbs-up',
    speechBubblePosition: 'top',
    arrowDirection: 'down',
    highlight: 'completeButton',
    showNextButton: false,
  },
  {
    id: 'CHECKOUT_SCAN',
    screen: 'Checkout',
    message: 'Kasada ürünleri sırayla okutmayı unutma!',
    bibiPosition: 'left',
    bibiAnimation: 'pointing',
    speechBubblePosition: 'top',
    arrowDirection: 'down',
    highlight: 'scanButton',
    showNextButton: true,
  },
  {
    id: 'CHECKOUT_PACK',
    screen: 'Checkout',
    message: 'Paketleme aşamasında ürünleri kutuya taşı!',
    bibiPosition: 'left',
    bibiAnimation: 'pointing',
    speechBubblePosition: 'top',
    arrowDirection: 'down',
    highlight: 'packArea',
    showNextButton: true,
  },
  {
    id: 'LEVEL_COMPLETE',
    screen: 'LevelResult',
    message: 'Tebrikler! Level 1\'i tamamladın! Artık kendi başına oynayabilirsin!',
    bibiPosition: 'center',
    bibiAnimation: 'thumbs-up',
    speechBubblePosition: 'top',
    arrowDirection: 'down',
    showNextButton: true,
  },
];

export const getTutorialStep = (id: TutorialStepId): TutorialStep | undefined => {
  return TUTORIAL_STEPS.find((step) => step.id === id);
};

export const getTutorialStepsForScreen = (screen: string): TutorialStep[] => {
  return TUTORIAL_STEPS.filter((step) => step.screen === screen);
};

export const getNextTutorialStep = (currentId: TutorialStepId): TutorialStep | undefined => {
  const currentIndex = TUTORIAL_STEPS.findIndex((step) => step.id === currentId);
  if (currentIndex === -1 || currentIndex === TUTORIAL_STEPS.length - 1) {
    return undefined;
  }
  return TUTORIAL_STEPS[currentIndex + 1];
};

