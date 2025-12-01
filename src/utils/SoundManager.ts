import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { getProductEnglishName } from './productEnglishNames';

type SfxType = 'step' | 'pop' | 'correct' | 'wrong' | 'victory' | 'click' | 'collect';
type MusicType = 'market_theme';

// Remote URLs for immediate feedback without local assets
const SOUND_URLS = {
    correct: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3', // Positive Ding
    wrong: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3',   // Error Buzz
    victory: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3', // Success Fanfare
    step: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_736952a6c6.mp3',    // Soft Click/Step
    market_theme: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_9f24732960.mp3' // Upbeat Kids Music
};

class SoundManager {
  private static instance: SoundManager;
  private soundObjects: Record<string, Audio.Sound> = {};
  private musicObject: Audio.Sound | null = null;
  private isMusicEnabled: boolean = true;
  private isSfxEnabled: boolean = true;
  private lastSpokenProduct: string | null = null;
  private lastSpokenTime: number = 0;
  private isSpeaking: boolean = false;
  private speakingLock: boolean = false; // Çift çağrıyı önlemek için lock
  private currentSpeakingProduct: string | null = null; // Şu anda konuşulan ürün
  private readonly SPEECH_COOLDOWN = 3000; // 3 saniye cooldown

  private constructor() {}

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public setAudioSettings(music: boolean, sfx: boolean) {
    this.isMusicEnabled = music;
    this.isSfxEnabled = sfx;

    if (!music && this.musicObject) {
      this.musicObject.stopAsync();
    } else if (music && this.musicObject) {
      this.musicObject.playAsync();
    }
  }

  // --- SFX ---
  public async playSfx(type: SfxType) {
    if (!this.isSfxEnabled) return;

    try {
      let url = '';
      switch (type) {
          case 'correct': url = SOUND_URLS.correct; break;
          case 'wrong': url = SOUND_URLS.wrong; break;
          case 'victory': url = SOUND_URLS.victory; break;
          case 'step': url = SOUND_URLS.step; break;
          default: return; 
      }

      if (!url) return;

      // Play remote sound
      const { sound } = await Audio.Sound.createAsync(
         { uri: url },
         { shouldPlay: true }
      );
      
      // Unload from memory after playing to prevent leaks
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
      
    } catch (error) {
      // console.warn('Failed to play SFX', error);
    }
  }

  // --- MUSIC ---
  public async playMusic(type: MusicType) {
    if (this.musicObject) return; // Already playing/loaded

    try {
      const url = SOUND_URLS.market_theme;
      if (!url) return;

      const { sound } = await Audio.Sound.createAsync(
         { uri: url },
         { isLooping: true, volume: 0.3 } // Lower volume for background music
      );
      this.musicObject = sound;
      
      if (this.isMusicEnabled) {
        await sound.playAsync();
      }
    } catch (error) {
      // console.warn('Failed to play Music', error);
    }
  }

  public async stopMusic() {
    if (this.musicObject) {
      try {
        await this.musicObject.stopAsync();
        await this.musicObject.unloadAsync();
        this.musicObject = null;
      } catch (error) {
        // console.warn('Failed to stop Music', error);
      }
    }
  }

  // --- TEXT-TO-SPEECH (Çocuksu Seslendirme) ---
  public speakProductName(productId: string) {
    if (!this.isSfxEnabled) return;

    // ProductId'yi normalize et (küçük harfe çevir)
    const normalizedProductId = productId.toLowerCase();
    const now = Date.now();
    
    // EN ÖNEMLİ KORUMA 1: Eğer zaten bir seslendirme işlemi devam ediyorsa (lock aktif), HEMEN çık
    // Bu kontrol EN BAŞTA olmalı - çift çağrıyı önlemek için
    if (this.speakingLock) {
      return;
    }
    
    // EN ÖNEMLİ KORUMA 2: Eğer zaten bu ürün konuşuluyorsa, HEMEN çık
    if (this.currentSpeakingProduct === normalizedProductId) {
      return;
    }
    
    // EN ÖNEMLİ KORUMA 3: Eğer zaten konuşma yapılıyorsa, yeni konuşma başlatma
    if (this.isSpeaking) {
      return;
    }
    
    // Aynı ürün için kısa süre içinde tekrar seslendirme yapma
    if (
      this.lastSpokenProduct === normalizedProductId &&
      now - this.lastSpokenTime < this.SPEECH_COOLDOWN
    ) {
      return; // Cooldown süresi dolmadı, seslendirme yapma
    }
    
    // TÜM KORUMALAR GEÇTİ - ŞİMDİ LOCK'U SET ET
    // LOCK'U HEMEN AKTİF ET (çift çağrıyı önlemek için - EN ÖNEMLİ KORUMA)
    // Bu satır, fonksiyonun geri kalanı çalışmadan ÖNCE çalışmalı
    this.speakingLock = true;
    this.currentSpeakingProduct = normalizedProductId;
    
    // Hemen timestamp'i güncelle (çift çağrıyı önlemek için)
    this.lastSpokenProduct = normalizedProductId;
    this.lastSpokenTime = now;
    
    // Güvenlik için: Eğer bir şeyler ters giderse, 5 saniye sonra lock'u sıfırla
    const safetyTimeout = setTimeout(() => {
      if (this.speakingLock && this.currentSpeakingProduct === normalizedProductId) {
        this.speakingLock = false;
        this.currentSpeakingProduct = null;
        this.isSpeaking = false;
      }
    }, 5000);

    try {
      // Önce mevcut konuşmayı durdur
      Speech.stop();
      
      // Ürün adını İngilizce'ye çevir
      const englishName = getProductEnglishName(productId);
      
      // Konuşma başladı olarak işaretle
      this.isSpeaking = true;
      
      // Çocuksu, çizgi film karakteri gibi bir ses için ayarlar
      // iOS'ta daha çocuksu sesler için pitch'i yükseltiyoruz
      Speech.speak(englishName, {
        language: 'en-US',
        pitch: 1.4, // Daha yüksek pitch = daha çocuksu, çizgi film karakteri gibi ses
        rate: 0.8, // Biraz daha yavaş = daha anlaşılır ve çocuksu
        volume: 1.0,
        onDone: () => {
          // Konuşma bittiğinde - TÜM FLAG'LERİ SIFIRLA
          clearTimeout(safetyTimeout);
          this.isSpeaking = false;
          this.speakingLock = false;
          this.currentSpeakingProduct = null;
        },
        onStopped: () => {
          // Konuşma durdurulduğunda - TÜM FLAG'LERİ SIFIRLA
          clearTimeout(safetyTimeout);
          this.isSpeaking = false;
          this.speakingLock = false;
          this.currentSpeakingProduct = null;
        },
        onError: (error) => {
          // Hata durumunda sessizce devam et - TÜM FLAG'LERİ SIFIRLA
          clearTimeout(safetyTimeout);
          this.isSpeaking = false;
          this.speakingLock = false;
          this.currentSpeakingProduct = null;
          // console.warn('TTS Error:', error);
        }
      });
    } catch (error) {
      // TTS kullanılamazsa sessizce devam et - TÜM FLAG'LERİ SIFIRLA
      this.isSpeaking = false;
      this.speakingLock = false;
      this.currentSpeakingProduct = null;
      // console.warn('Failed to speak product name', error);
    }
  }
}

export const soundManager = SoundManager.getInstance();
