import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { COLORS } from '../theme/colors';
import type { ShelfDefinition } from '../data/products';
import { productImages } from '../assets/productImages';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SceneViewProps {
  shelves: ShelfDefinition[];
  onInteract: (shelfId: string) => void;
  onProductSelect: (productId: string, brandId?: string) => void;
  gameMode: string;
}

export const SceneView: React.FC<SceneViewProps> = ({ shelves, onInteract, onProductSelect, gameMode }) => {
  const [playerX, setPlayerX] = useState(50);
  const scrollX = useRef(new Animated.Value(0)).current;
  const characterAnim = useRef(new Animated.Value(0)).current;
  const [walking, setWalking] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  
  const moveInterval = useRef<NodeJS.Timeout | null>(null);

  // Market Genişliği
  const SHELF_WIDTH = 180;
  const SHELF_GAP = 60;
  const START_OFFSET = 80;
  const MARKET_WIDTH = Math.max(SCREEN_WIDTH * 1.2, shelves.length * (SHELF_WIDTH + SHELF_GAP) + 400);

  // Yürüme Animasyonu
  useEffect(() => {
    if (walking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(characterAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
          Animated.timing(characterAnim, { toValue: 0, duration: 150, useNativeDriver: true })
        ])
      ).start();
    } else {
      characterAnim.setValue(0);
    }
  }, [walking]);

  // Karakteri hareket ettir
  const moveCharacter = (dir: 'left' | 'right') => {
    setDirection(dir);
    setWalking(true);
    
    const speed = 10;
    setPlayerX(prev => {
      const newX = dir === 'right' ? prev + speed : prev - speed;
      // Sınırlar
      if (newX < 0 || newX > MARKET_WIDTH - 60) return prev;
      
      // Kamerayı kaydır
      const targetScroll = Math.max(0, Math.min(newX - SCREEN_WIDTH / 2, MARKET_WIDTH - SCREEN_WIDTH));
      
      // Scroll animasyonu state update içinde tetiklenmemeli, bu yüzden ref veya useEffect kullanılabilir ama
      // burada performansı korumak için doğrudan setValue/timing kullanıyoruz.
      // Ancak render loop içinde değiliz, event handler içindeyiz, güvenli.
      scrollX.setValue(targetScroll); 
      
      return newX;
    });
  };

  // Yakındaki rafı bul
  const nearbyShelf = shelves.find((shelf, index) => {
    const shelfX = START_OFFSET + index * (SHELF_WIDTH + SHELF_GAP);
    const shelfCenter = shelfX + SHELF_WIDTH / 2;
    const playerCenter = playerX + 20;
    return Math.abs(shelfCenter - playerCenter) < 80; 
  });

  const isBakkal = gameMode === 'BAKKAL';

  // Ürün görselini bulma yardımcısı
  const getProductVisual = (productId: string) => {
    // 1. Try direct match
    if (productImages[productId]) return productImages[productId];
    // 2. Try lowercase
    if (productImages[productId.toLowerCase()]) return productImages[productId.toLowerCase()];
    // 3. Try removing underscores
    const normalized = productId.replace(/_/g, '-').toLowerCase();
    if (productImages[normalized]) return productImages[normalized];
    
    return { emojiFallback: '📦' };
  };

  return (
    <View style={styles.container}>
      {/* Kontroller - Sol */}
      <TouchableOpacity
        style={[styles.controlArea, { left: 0 }]}
        onPressIn={() => {
          if (moveInterval.current) clearInterval(moveInterval.current);
          moveInterval.current = setInterval(() => moveCharacter('left'), 16);
        }}
        onPressOut={() => {
          if (moveInterval.current) clearInterval(moveInterval.current);
          setWalking(false);
        }}
      >
        <View style={styles.arrowIndicatorLeft}><Text style={styles.arrowText}>{'<'}</Text></View>
      </TouchableOpacity>

      {/* Kontroller - Sağ */}
      <TouchableOpacity
        style={[styles.controlArea, { right: 0 }]}
        onPressIn={() => {
          if (moveInterval.current) clearInterval(moveInterval.current);
          moveInterval.current = setInterval(() => moveCharacter('right'), 16);
        }}
        onPressOut={() => {
          if (moveInterval.current) clearInterval(moveInterval.current);
          setWalking(false);
        }}
      >
        <View style={styles.arrowIndicatorRight}><Text style={styles.arrowText}>{'>'}</Text></View>
      </TouchableOpacity>

      {/* Hareketli Sahne */}
      <Animated.View 
        style={[
          styles.sceneContent, 
          { width: MARKET_WIDTH, transform: [{ translateX: Animated.multiply(scrollX, -1) }] }
        ]}
      >
        {/* Arkaplan: Duvar */}
        <View style={[styles.wall, { backgroundColor: isBakkal ? '#FFF3E0' : '#E3F2FD' }]}>
          <View style={styles.wallPattern} />
          {/* Posterler */}
          <View style={[styles.poster, { left: 150, backgroundColor: '#FFCCBC', transform: [{rotate: '2deg'}] }]}>
             <Text style={{fontSize: 20}}>🍎</Text>
          </View>
          <View style={[styles.poster, { left: 450, backgroundColor: '#C8E6C9', transform: [{rotate: '-1deg'}] }]}>
             <Text style={{fontSize: 20}}>🥦</Text>
          </View>
          <View style={[styles.poster, { left: 750, backgroundColor: '#BBDEFB', transform: [{rotate: '1deg'}] }]}>
             <Text style={{fontSize: 20}}>🥛</Text>
          </View>
        </View>
        
        {/* Zemin */}
        <View style={[styles.floor, { backgroundColor: isBakkal ? '#5D4037' : '#78909C' }]}>
            <View style={styles.floorTexture} />
        </View>

        {/* Raflar */}
        {shelves.map((shelf, index) => {
          const shelfX = START_OFFSET + index * (SHELF_WIDTH + SHELF_GAP);
          return (
            <View key={shelf.id} style={[styles.shelfContainer, { left: shelfX, width: SHELF_WIDTH }]}>
              {/* Tabela */}
              <View style={styles.signBoardWrapper}>
                <View style={styles.signBoard}>
                  <Text style={styles.signText}>{shelf.title}</Text>
                </View>
                <View style={styles.signChainLeft} />
                <View style={styles.signChainRight} />
              </View>
              
              {/* Raf Gövdesi */}
              <View style={styles.shelfStructure}>
                {/* Arka Panel */}
                <View style={styles.shelfBackPanel} />
                
                {/* Katmanlar ve Ürünler */}
                {[0, 1, 2].map(levelIdx => (
                  <View key={levelIdx} style={styles.shelfLevelContainer}>
                    <View style={styles.shelfPlank} />
                    <View style={styles.productsOnShelf}>
                        {shelf.variants.slice(levelIdx * 2, levelIdx * 2 + 2).map((variant, vIdx) => {
                           const visual = getProductVisual(variant.productId);
                           return (
                             <TouchableOpacity 
                               key={vIdx} 
                               style={styles.productDisplay}
                               onPress={() => onProductSelect(variant.productId, variant.brandId)}
                               activeOpacity={0.6}
                             >
                                <Text style={styles.productEmoji}>{visual.emojiFallback}</Text>
                             </TouchableOpacity>
                           );
                        })}
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.shelfShadow} />
            </View>
          );
        })}

        {/* Kasa ve Ayıcık */}
        <View style={[styles.checkoutArea, { left: MARKET_WIDTH - 280 }]}>
          {/* Kasa Tezgahı */}
          <View style={styles.checkoutCounter} />
          <View style={styles.checkoutCounterTop} />
          
          {/* Yazar Kasa */}
          <View style={styles.cashRegister}>
             <View style={styles.registerScreen} />
             <View style={styles.registerButtons} />
          </View>
          
          {/* Ayıcık Kasiyer */}
          <View style={styles.bear}>
            <View style={styles.bearHead}>
               <View style={styles.earLeft} />
               <View style={styles.earRight} />
               <View style={styles.bearFaceInner}>
                 <View style={styles.eyeLeft} />
                 <View style={styles.eyeRight} />
                 <View style={styles.noseContainer}>
                   <View style={styles.nose} />
                 </View>
                 <View style={styles.mouth} />
               </View>
            </View>
            <View style={styles.bearBody}>
              <View style={styles.apron}>
                 <Text style={styles.apronText}>BAKKAL</Text>
              </View>
            </View>
            <View style={styles.armLeft} />
            <View style={styles.armRight} />
          </View>

          <View style={styles.checkoutSign}>
            <Text style={styles.checkoutSignText}>KASA</Text>
          </View>
        </View>

        {/* Oyuncu Karakteri */}
        <Animated.View 
          style={[
            styles.character, 
            { 
              left: playerX,
              transform: [
                { scaleX: direction === 'left' ? -1 : 1 },
                { translateY: characterAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }
              ] 
            }
          ]}
        >
          <View style={styles.charHead}>
             <View style={styles.charEye} />
          </View>
          <View style={styles.charBody}>
             <View style={styles.charStripe} />
          </View>
          <View style={styles.charLegs} />
          <View style={styles.charArm} />
        </Animated.View>

      </Animated.View>

      {/* Etkileşim Butonu */}
      {nearbyShelf && (
        <TouchableOpacity 
          style={styles.interactButton} 
          onPress={() => onInteract(nearbyShelf.id)}
        >
          <Text style={styles.interactText}>🔍 İncele: {nearbyShelf.title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'hidden'
  },
  sceneContent: {
    height: '100%',
    position: 'relative'
  },
  wall: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '70%',
    borderBottomWidth: 0
  },
  wallPattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
    backgroundColor: '#000' // Slight texture effect
  },
  poster: {
    position: 'absolute',
    top: 60,
    width: 50,
    height: 70,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  floor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    borderTopWidth: 0
  },
  floorTexture: {
     ...StyleSheet.absoluteFillObject,
     borderTopWidth: 4,
     borderColor: 'rgba(0,0,0,0.1)',
     opacity: 0.8
  },
  
  // Shelf Styling
  shelfContainer: {
    position: 'absolute',
    bottom: '25%', 
    height: 240,
    zIndex: 5,
    alignItems: 'center'
  },
  signBoardWrapper: {
    position: 'absolute',
    top: -30,
    alignItems: 'center',
    zIndex: 10
  },
  signBoard: {
    backgroundColor: '#5D4037',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#8D6E63',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3
  },
  signText: {
    color: '#FFECB3',
    fontWeight: '800',
    fontSize: 11,
    textAlign: 'center'
  },
  signChainLeft: {
    position: 'absolute',
    top: 20,
    left: 10,
    width: 2,
    height: 15,
    backgroundColor: '#8D6E63'
  },
  signChainRight: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 2,
    height: 15,
    backgroundColor: '#8D6E63'
  },
  shelfStructure: {
    width: '100%',
    height: '100%',
    backgroundColor: '#8D6E63', // Wood color
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#5D4037',
    padding: 6,
    justifyContent: 'space-evenly'
  },
  shelfBackPanel: {
    position: 'absolute',
    top: 6, 
    left: 6, 
    right: 6, 
    bottom: 6,
    backgroundColor: '#6D4C41', // Darker wood inside
    borderRadius: 8
  },
  shelfLevelContainer: {
    height: 60,
    justifyContent: 'flex-end',
    marginBottom: 5
  },
  shelfPlank: {
    height: 8,
    backgroundColor: '#A1887F',
    width: '100%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#5D4037'
  },
  productsOnShelf: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: 4
  },
  productDisplay: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  productEmoji: {
    fontSize: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  shelfShadow: {
    position: 'absolute',
    bottom: -10,
    width: '90%',
    height: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10
  },

  // Character Styles
  character: {
    position: 'absolute',
    bottom: '22%',
    width: 45,
    height: 90,
    zIndex: 20,
    alignItems: 'center'
  },
  charHead: {
    width: 28,
    height: 28,
    backgroundColor: '#FFCC80',
    borderRadius: 14,
    marginBottom: -4,
    zIndex: 2,
    borderWidth: 1,
    borderColor: '#E65100'
  },
  charEye: {
    position: 'absolute',
    top: 8,
    right: 6,
    width: 4,
    height: 4,
    backgroundColor: '#000',
    borderRadius: 2
  },
  charBody: {
    width: 32,
    height: 36,
    backgroundColor: '#F44336', // Red Shirt
    borderRadius: 8,
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#B71C1C',
    justifyContent: 'center'
  },
  charStripe: {
    height: 4,
    backgroundColor: '#FFCDD2',
    width: '100%',
    marginTop: -10
  },
  charLegs: {
    width: 32,
    height: 28,
    backgroundColor: '#1565C0', // Blue Jeans
    borderRadius: 4,
    marginTop: -4,
    borderWidth: 1,
    borderColor: '#0D47A1'
  },
  charArm: {
    position: 'absolute',
    top: 35,
    right: -5,
    width: 10,
    height: 25,
    backgroundColor: '#FFCC80',
    borderRadius: 5,
    transform: [{ rotate: '-20deg' }],
    borderWidth: 1,
    borderColor: '#E65100'
  },

  // Checkout & Bear
  checkoutArea: {
    position: 'absolute',
    bottom: '24%',
    width: 180,
    height: 180,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  checkoutCounter: {
    width: 160,
    height: 70,
    backgroundColor: '#8D6E63',
    borderWidth: 2,
    borderColor: '#4E342E',
    borderRadius: 6,
    zIndex: 5
  },
  checkoutCounterTop: {
    position: 'absolute',
    bottom: 70,
    width: 170,
    height: 10,
    backgroundColor: '#A1887F',
    borderRadius: 4,
    zIndex: 6
  },
  cashRegister: {
    position: 'absolute',
    bottom: 80,
    right: 40,
    width: 40,
    height: 35,
    backgroundColor: '#90A4AE',
    borderRadius: 6,
    zIndex: 6,
    borderWidth: 1,
    borderColor: '#546E7A'
  },
  registerScreen: {
    width: '80%',
    height: 15,
    backgroundColor: '#263238',
    alignSelf: 'center',
    marginTop: 4,
    borderRadius: 2
  },
  registerButtons: {
    marginTop: 4,
    width: '60%',
    height: 2,
    backgroundColor: '#CFD8DC',
    alignSelf: 'center'
  },
  checkoutSign: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#4E342E',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#3E2723',
    zIndex: 7
  },
  checkoutSignText: {
    color: '#FFECB3',
    fontWeight: 'bold',
    fontSize: 12
  },
  
  // BEAR DETAIL
  bear: {
    position: 'absolute',
    bottom: 75,
    left: 20,
    alignItems: 'center',
    zIndex: 4
  },
  bearHead: {
    width: 56,
    height: 50,
    backgroundColor: '#795548', // Brown
    borderRadius: 25,
    zIndex: 2,
    borderWidth: 2,
    borderColor: '#4E342E'
  },
  earLeft: {
    position: 'absolute',
    top: -8,
    left: 0,
    width: 20,
    height: 20,
    backgroundColor: '#5D4037',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4E342E'
  },
  earRight: {
    position: 'absolute',
    top: -8,
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: '#5D4037',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4E342E'
  },
  bearFaceInner: {
    marginTop: 12,
    alignItems: 'center'
  },
  eyeLeft: {
    position: 'absolute',
    top: 4,
    left: 14,
    width: 6,
    height: 6,
    backgroundColor: '#000',
    borderRadius: 3
  },
  eyeRight: {
    position: 'absolute',
    top: 4,
    right: 14,
    width: 6,
    height: 6,
    backgroundColor: '#000',
    borderRadius: 3
  },
  noseContainer: {
    position: 'absolute',
    top: 14,
    width: 18,
    height: 14,
    backgroundColor: '#D7CCC8', // Light snout
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nose: {
    width: 8,
    height: 6,
    backgroundColor: '#3E2723',
    borderRadius: 3
  },
  mouth: {
    position: 'absolute',
    top: 28,
    width: 10,
    height: 2,
    backgroundColor: '#3E2723'
  },
  bearBody: {
    width: 64,
    height: 55,
    backgroundColor: '#795548',
    marginTop: -6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4E342E'
  },
  apron: {
    width: 44,
    height: 35,
    backgroundColor: '#4CAF50', // Green Apron
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2E7D32'
  },
  apronText: {
    fontSize: 7,
    color: '#FFF',
    fontWeight: '900'
  },
  armLeft: {
    position: 'absolute',
    top: 40,
    left: -10,
    width: 15,
    height: 30,
    backgroundColor: '#795548',
    borderRadius: 8,
    transform: [{rotate: '20deg'}],
    borderWidth: 2,
    borderColor: '#4E342E'
  },
  armRight: {
    position: 'absolute',
    top: 40,
    right: -10,
    width: 15,
    height: 30,
    backgroundColor: '#795548',
    borderRadius: 8,
    transform: [{rotate: '-140deg'}], // Waving
    borderWidth: 2,
    borderColor: '#4E342E'
  },

  // Controls
  controlArea: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 90,
    zIndex: 50,
    justifyContent: 'center'
  },
  arrowIndicatorLeft: {
    marginLeft: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)'
  },
  arrowIndicatorRight: {
    alignSelf: 'flex-end',
    marginRight: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)'
  },
  arrowText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '900'
  },
  interactButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#FFB300',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#FFF',
    zIndex: 100,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6
  },
  interactText: {
    color: '#3E2723',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 0.5
  }
});
