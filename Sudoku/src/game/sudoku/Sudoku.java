package game.sudoku;
//Last page 130
import android.os.Bundle;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.app.Activity;
import android.content.Intent;
import android.content.res.Configuration;
import android.view.View;
import android.view.View.OnClickListener;

public class Sudoku extends Activity implements OnClickListener {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		View continueButton = findViewById(R.id.continue_button);
		continueButton.setOnClickListener(this);
		View newButton = findViewById(R.id.new_button);
		newButton.setOnClickListener(this);
		View aboutButton = findViewById(R.id.rules_button);
		aboutButton.setOnClickListener(this);
		View exitButton = findViewById(R.id.exit_button);
		exitButton.setOnClickListener(this);
	}

	@Override
	protected void onResume() {
		super.onResume();
		Music.play(this, R.raw.menusong);
	}

	@Override
	protected void onPause() {
		super.onPause();
		Music.stop(this);
	}

	@Override
	public void onClick(View v) {
		switch (v.getId()) {
		case R.id.continue_button:
			startGame(Game.DIFFICULTY_CONTINUE);
			break;
		case R.id.rules_button:
			Intent i = new Intent(this, Rules.class);
			startActivity(i);
			break;
		case R.id.new_button:
			openNewGameDialog();
			break;
		case R.id.exit_button:
			finish();
			break;
		}

	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		super.onCreateOptionsMenu(menu);
		MenuInflater inflater = getMenuInflater();
		inflater.inflate(R.menu.menu, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case R.id.settings:
			startActivity(new Intent(this, Prefs.class));
			return true;
			// More items go here (if any) ...
		}
		return false;
	}
	@Override
	public void onConfigurationChanged(Configuration config){
		super.onConfigurationChanged(config);
	}

	private void openNewGameDialog() {
		new AlertDialog.Builder(this)
		.setTitle(R.string.new_game_title).setItems(R.array.difficulty,
				new DialogInterface.OnClickListener() {
			public void onClick(DialogInterface dialoginterface,
					int i) {
				startGame(i);
			}
		})
		.show();
	}
	private void startGame(int i) {
		Log.d("Sudoku", "clicked on " + i);
		Intent intent = new Intent(Sudoku.this, Game.class);
		intent.putExtra(Game.KEY_DIFFICULTY, i);
		startActivity(intent);
	}

}
