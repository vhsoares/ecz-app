import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function canGoBack() {
  if(navigationRef.isReady()) {
    return navigationRef.canGoBack()
  }
  return false
}

export function back() {
  if(navigationRef.isReady()) {
    navigationRef.goBack()
  }
}
