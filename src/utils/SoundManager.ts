import { Audio } from 'expo-av';

type SfxType = 'step' | 'pop' | 'correct' | 'wrong' | 'victory' | 'click' | 'collect';
type MusicType = 'market_theme';

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
      // Since we can't actually load files in this environment, we will mock the playing.
      // In a real app, you would map `type` to a `require('./assets/sounds/...')`
      // and verify the sound is loaded.
      
      // console.log(`[SoundManager] Playing SFX: ${type}`);
      
      // Placeholder for real implementation:
      /*
      const { sound } = await Audio.Sound.createAsync(
         GetSourceForType(type)
      );
      await sound.playAsync();
      // Unload from memory after playing to prevent leaks
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
      */
    } catch (error) {
      console.warn('Failed to play SFX', error);
    }
  }

  // --- MUSIC ---
  public async playMusic(type: MusicType) {
    if (this.musicObject) return; // Already playing/loaded

    try {
      // console.log(`[SoundManager] Loading Music: ${type}`);
      // In real app:
      /*
      const { sound } = await Audio.Sound.createAsync(
         require('../assets/sounds/market_theme.mp3'),
         { isLooping: true, volume: 0.5 }
      );
      this.musicObject = sound;
      if (this.isMusicEnabled) {
        await sound.playAsync();
      }
      */
    } catch (error) {
      console.warn('Failed to play Music', error);
    }
  }

  public async stopMusic() {
    if (this.musicObject) {
      try {
        await this.musicObject.stopAsync();
        await this.musicObject.unloadAsync();
        this.musicObject = null;
      } catch (error) {
        console.warn('Failed to stop Music', error);
      }
    }
  }
}

export const soundManager = SoundManager.getInstance();

