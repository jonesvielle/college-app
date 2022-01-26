package com.college1;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
// import com.interswitchng.IswMobileSdkPackage;
// import com.interswitchng.IswMobileSdkPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;
import java.lang.reflect.InvocationTargetException;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        public boolean canOverrideExistingModule() {        
          return true;    
        }

        // @Override    
        // public boolean canOverrideExistingModule() {        
        //   return true;    
        // }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          // packages.add(new IswMobileSdkPackage())
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };
  
 

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    long size = 500L * 1024L * 1024L; // 50 MB
    com.facebook.react.modules.storage.ReactDatabaseSupplier.getInstance(getApplicationContext()).setMaximumSize(size);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }



  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.college1.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
//  @Override    
//   public boolean canOverrideExistingModule() {        
//     return true;    
//   }
