# Nexus P2P Ledger Pro

Portal de gestión, análisis y auditoría de inversiones P2P en **USDT/MXN**, con módulo de
análisis por IA (Google Gemini).

Originalmente creado en Google AI Studio; este repositorio lo convierte en un proyecto
compilable con **Vite + React 19 + TypeScript**, empaquetable como **app Android** vía Capacitor.

## Qué incluye

| Módulo | Archivo |
|---|---|
| Registro de compras/ventas | `components/TransactionForm.tsx` |
| Historial y auditoría | `components/HistoryTable.tsx` |
| Métricas del portafolio | `components/StatsCards.tsx` |
| Control de límite mensual | `components/MonthlyLimitTracker.tsx` |
| Escenarios de rentabilidad | `components/ProfitScenarioCard.tsx` |
| Simulador de operaciones | `components/SimulationModal.tsx` |
| Ajustes manuales de saldo | `components/AdjustmentModal.tsx` |
| Análisis con IA (Gemini) | `components/AiInsight.tsx`, `services/geminiService.ts` |

Los datos se guardan en el `localStorage` del dispositivo — no hay servidor ni cuenta.
En Android el `localStorage` del WebView persiste entre sesiones, pero **se borra si
desinstalas la app o limpias sus datos**. No hay respaldo automático.

## Desarrollo

```bash
npm install
cp .env.example .env     # opcional: pon tu GEMINI_API_KEY
npm run dev              # http://localhost:5173
```

Otros comandos:

```bash
npm run build       # compila a dist/
npm run typecheck   # verifica tipos sin emitir
npm run preview     # sirve el build de producción
```

## App Android

El proyecto nativo vive en `android/` (Capacitor 6, `minSdk 22` = Android 5.1+).
La web se empaqueta dentro del APK, así que la app **abre sin conexión**; solo el
módulo de IA necesita internet.

### Opción A — compilar en GitHub Actions (sin instalar nada)

El workflow `.github/workflows/android.yml` compila el APK en cada push.

1. Ve a la pestaña **Actions** del repositorio.
2. Abre la ejecución más reciente de *Build Android APK*.
3. Descarga el artefacto **`nexus-p2p-apk`**.
4. Pasa el `.apk` al teléfono y ábrelo (hay que permitir "instalar apps de orígenes
   desconocidos" para la app desde la que lo abras).

El APK de depuración va firmado con la clave de debug de Android: sirve para instalarlo
tú mismo, pero **no** para publicarlo en Play Store.

### Opción B — compilar en tu máquina

Requiere JDK 21 y el Android SDK (lo más fácil es instalar Android Studio):

```bash
npm run android:apk    # genera android/app/build/outputs/apk/debug/app-debug.apk
npm run android:open   # o ábrelo en Android Studio
```

### Publicar en Play Store (APK/AAB firmado)

1. Genera un keystore y **guárdalo bien** — si lo pierdes no podrás volver a actualizar
   la app publicada:

   ```bash
   keytool -genkey -v -keystore release.keystore -alias nexus \
     -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Carga estos 4 secretos en *Settings → Secrets and variables → Actions*:

   | Secreto | Valor |
   |---|---|
   | `ANDROID_KEYSTORE_BASE64` | `base64 -w0 release.keystore` |
   | `ANDROID_KEYSTORE_PASSWORD` | contraseña del keystore |
   | `ANDROID_KEY_ALIAS` | `nexus` |
   | `ANDROID_KEY_PASSWORD` | contraseña de la clave |

3. El workflow detecta los secretos y compila también el APK de release firmado.
   Al empujar un tag `v*` (p. ej. `git tag v1.0.0 && git push --tags`) los APKs se
   adjuntan además a una Release de GitHub.

## Web

También se despliega como web estática. `vercel.json` ya incluye el rewrite de SPA:

```bash
npm run build   # sube dist/ a Vercel, Netlify, Cloudflare Pages, etc.
```

## Clave de Gemini

El análisis con IA usa `GEMINI_API_KEY`, que se inyecta **en tiempo de build**
(`vite.config.ts`). Sin ella la app funciona con normalidad y solo el panel de IA queda
desactivado.

> **Aviso de seguridad:** una clave inyectada en el bundle queda visible para cualquiera
> que inspeccione la web o descompile el APK. Restringe la clave en Google Cloud, o
> muévela detrás de un backend propio si la app va a ser pública.

## Estructura

```
App.tsx                  # estado global, portafolios, persistencia
index.tsx / index.html   # punto de entrada
index.css                # Tailwind + ajustes de WebView móvil
types.ts                 # modelo de datos (Transaction, PortfolioStats…)
components/              # UI
services/geminiService.ts# integración con Gemini
android/                 # proyecto nativo de Capacitor
```
