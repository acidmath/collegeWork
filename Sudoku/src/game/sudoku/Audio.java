package game.sudoku;

import android.app.Activity;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.KeyEvent;
public class Audio extends Activity {
	private MediaPlayer mp, music;
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		setVolumeControlStream(AudioManager.STREAM_MUSIC);
		music = MediaPlayer.create(this, R.raw.drakebottom);
		music.start();
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		int resId;
		switch (keyCode) {
		case KeyEvent.KEYCODE_DPAD_UP:
			resId = R.raw.up;
			break;
		case KeyEvent.KEYCODE_DPAD_DOWN:
			resId = R.raw.down;
			break;
		default:
			return super.onKeyDown(keyCode, event);
		}

		// Release any resources from previous MediaPlayer
		if (mp != null) {
			mp.release();
		}

		// Create a new MediaPlayer to play this sound
		mp = MediaPlayer.create(this, resId);
		mp.start();

		// Indicate this key was handled
		return true;
	}
}