import { Audio } from 'expo-av';

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
}

export const soundManager = SoundManager.getInstance();
