# Nexus P2P Ledger

Gestión, análisis y auditoría de inversiones P2P en **USDT/MXN**.

Aplicación **100% local**: no hace ninguna petición de red, no tiene servidor, no pide
cuenta y no depende de ninguna API. Todo se calcula y se guarda en tu propio dispositivo.

Originalmente creada en Google AI Studio; este repositorio la convierte en un proyecto
compilable con **Vite + React 19 + TypeScript**, empaquetable como **app Android** vía
Capacitor.

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

## Sobre tus datos

Se guardan en el `localStorage` del dispositivo. Nada sale del teléfono.

⚠️ **No hay respaldo automático.** Los datos se borran si desinstalas la app o limpias
sus datos desde los ajustes de Android. Si vas a llevar registro de dinero real,
conviene añadir una función de exportar/importar a archivo.

## Desarrollo

```bash
npm install
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
La web va empaquetada dentro del APK, así que la app funciona por completo sin conexión.

### Opción A — descargar el APK ya compilado

Cada push reconstruye el APK y actualiza este enlace, que siempre apunta al build
más reciente:

**https://github.com/Enkimedicina/p2p-2026/releases/download/apk-latest/nexus-p2p-ledger.apk**

Ábrelo directamente desde el teléfono. Android pedirá permitir "instalar apps de
orígenes desconocidos" para la app desde la que lo abras.

> Se publica como Release y no solo como artefacto de Actions porque **los artefactos
> no se pueden descargar desde el navegador de un móvil**: GitHub no expone el enlace
> en el layout de celular. El artefacto `nexus-p2p-apk` sigue disponible en cada
> ejecución para quien descargue desde una computadora.

El APK va firmado con la clave de debug de Android: sirve para instalarlo tú mismo,
pero **no** para publicarlo en Play Store.

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

## Estructura

```
App.tsx                  # estado global, portafolios, persistencia
index.tsx / index.html   # punto de entrada
index.css                # tipografía auto-alojada + Tailwind + ajustes de WebView
types.ts                 # modelo de datos (Transaction, PortfolioStats…)
components/              # UI
fonts/                   # Inter (fuente variable, auto-alojada)
public/                  # manifiesto PWA e iconos, copiados tal cual
android/                 # proyecto nativo de Capacitor
```
