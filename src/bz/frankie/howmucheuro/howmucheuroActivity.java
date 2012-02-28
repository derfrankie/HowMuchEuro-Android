package bz.frankie.howmucheuro;

import android.app.Activity;
import android.os.Bundle;
import com.google.android.apps.analytics.GoogleAnalyticsTracker;
import com.phonegap.*;

public class howmucheuroActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
        
    }
}