# 🚀 Fonctionnalités Avancées - Redux & Context API

## Installation
```bash
npm install redux @reduxjs/toolkit react-redux
```

## Comparaison: Context API vs Redux

| Caractéristique | Context API | Redux |
|-----------------|------------|-------|
| **Complexité** | Simple | Complexe |
| **État Global** | Oui | Oui |
| **DevTools** | Non | Oui ✅ |
| **Performance** | OK | Excellent |
| **Scalabilité** | Moyen | Excellent ✅ |
| **Debugging** | Difficile | Facile ✅ |
| **Cas d'Usage** | Petits projets | Grands projets |

## Recommandation

**Tofendo Admin** est un **dashboard complexe** avec:
- Authentification multi-étapes
- Données temps réel
- État global important
- Besoin de debugging avancé

**→ Utiliser Redux pour meilleure scalabilité et maintenabilité**

## 📋 Étapes d'Implémentation Redux

### 1. Configuration Store
✅ Fichier créé: `src/store/redux.config.js`

### 2. Setup dans main.jsx
```javascript
import { Provider } from 'react-redux';
import store from './store/redux.config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### 3. Utiliser dans Composants
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/redux.config';

function LoginComponent() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);

  const handleLogin = async (credentials) => {
    dispatch(authActions.setLoading(true));
    try {
      // API call
      dispatch(authActions.setUser(user));
    } catch (err) {
      dispatch(authActions.setError(err.message));
    }
  };
}
```

## 🎯 Quand Utiliser Quoi

### ✅ Utiliser Context API
- Petits projets
- État simple
- Peu de mises à jour fréquentes
- Équipe débutante

**Exemple:** `AuthContext`, `NotificationContext`

### ✅ Utiliser Redux
- Grands projets complexes
- État global important
- Nombreuses mises à jour
- Équipe expérimentée
- Besoin de devtools

**Exemple:** Tofendo Admin avec Redux

## 📦 Package.json - Optionnel

Pour activez Redux, ajouter à package.json:
```json
{
  "devDependencies": {
    "@reduxjs/toolkit": "^1.9.7",
    "redux": "^4.2.1",
    "react-redux": "^8.1.3",
    "redux-devtools-extension": "^2.13.9"
  }
}
```

Puis: `npm install`
