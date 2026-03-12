# King Long México — Guía de Producción Capacitor

## Pre-requisitos
- Node.js 18+
- Xcode 15+ (iOS) / Android Studio Hedgehog+ (Android)
- CocoaPods (iOS): `sudo gem install cocoapods`

## 1. Exportar desde Lovable
1. En Lovable, haz clic en **Export to GitHub**
2. Clona tu repositorio: `git clone <tu-repo-url>`
3. `cd <tu-repo> && npm install`

## 2. Configurar Variables de Entorno
Crea un archivo `.env.production` (NO se sube a Git):
```
VITE_SUPABASE_URL=https://bhrzjdlqefjtfcqztnyp.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<tu-anon-key>
VITE_SUPABASE_PROJECT_ID=bhrzjdlqefjtfcqztnyp
```

## 3. Preparar para Build Nativo
Edita `capacitor.config.ts` para producción — **comenta o elimina** la sección `server.url` para que use archivos locales:
```ts
const config: CapacitorConfig = {
  appId: 'app.lovable.26daf65450674d53941c0042836b48f8',
  appName: 'King Long MX',
  webDir: 'dist',
  // server: { url: '...', cleartext: true }, // ← SOLO para desarrollo
};
```

## 4. App Icon & Splash Screen
Coloca tus assets en la raíz del proyecto:
- `resources/icon.png` — 1024x1024px, PNG, sin transparencia
- `resources/splash.png` — 2732x2732px, PNG, logo centrado

Luego ejecuta:
```bash
npm install @capacitor/assets --save-dev
npx capacitor-assets generate
```

Esto genera automáticamente todos los tamaños para iOS y Android.

## 5. Build & Deploy
```bash
# Build del frontend
npm run build

# Agregar plataformas (solo la primera vez)
npx cap add ios
npx cap add android

# Sincronizar cambios
npx cap sync

# Abrir en IDE nativo
npx cap open ios      # Abre Xcode
npx cap open android  # Abre Android Studio
```

## 6. Configuración App Store (iOS)
En Xcode:
1. Signing & Capabilities → Selecciona tu Apple Developer Team
2. General → Bundle Identifier: `app.lovable.26daf65450674d53941c0042836b48f8`
3. General → Display Name: `King Long MX`
4. General → Version: `1.0.0`, Build: `1`
5. Product → Archive → Distribute App → App Store Connect

## 7. Configuración Google Play (Android)
En Android Studio:
1. Build → Generate Signed Bundle/APK → Android App Bundle
2. Crea o usa tu keystore de firma
3. Build type: `release`
4. Sube el `.aab` a Google Play Console

## 8. Deep Linking (ya configurado)
El código ya soporta deep linking para auth:
- Custom scheme: `app.lovable.26daf65450674d53941c0042836b48f8://`
- Archivo: `src/lib/deeplink.ts`

Para iOS, agrega en Info.plist (Xcode lo maneja automáticamente con Capacitor):
```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>app.lovable.26daf65450674d53941c0042836b48f8</string>
    </array>
  </dict>
</array>
```

## 9. Seguridad
- ✅ HashRouter para compatibilidad con `file://`
- ✅ RBAC con tabla `user_roles` y función `has_role()`
- ✅ AdminRoute protege `/admin` con doble verificación (auth + rol)
- ✅ Panel admin NO visible en navegación pública
- ✅ Variables de entorno separadas de la lógica UI
- ✅ RLS policies en todas las tablas

## 10. Checklist Pre-Publicación
- [ ] Eliminar `server.url` de `capacitor.config.ts`
- [ ] Generar App Icon y Splash Screen
- [ ] Probar login/signup en dispositivo físico
- [ ] Verificar deep linking funciona en iOS/Android
- [ ] Firmar la app con certificado de producción
- [ ] Subir a App Store Connect / Google Play Console
