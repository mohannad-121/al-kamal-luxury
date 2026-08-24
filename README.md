# Al Kamal Luxury

# BUILD AN ULTRA-LUXURY FRONTEND-ONLY RESTAURANT WEBSITE FOR "مطعم الكمال"

I am uploading several real reference images of the restaurant, its food, storefront, branding, and chef uniform.

## READ THIS FIRST

This project is currently a **FRONTEND-ONLY CLIENT DEMO**.

DO NOT create:

* Database
* Supabase
* Firebase
* Backend
* API routes
* Server functions
* Server-side authentication
* Real order persistence
* Real payment integration
* Real CMS
* Database schema
* External backend services

I will build and connect the entire backend later myself.

Your job right now is to create an **exceptionally beautiful, highly polished, interactive, production-quality frontend experience** that makes the restaurant owner immediately impressed.

All dynamic functionality should currently use:

* mock data
* local frontend state
* reusable data files
* temporary demo content

Architect the frontend cleanly so that I can later replace mock data with real APIs without redesigning the UI.

---

# BRAND

Restaurant name:

# مطعم الكمال

English:

# Al Kamal Restaurant

Brand message:

# أكل شعبي... بطعم الكمال

Alternative premium headline:

# نكهة الكمال

Arabic should be the DEFAULT language.

The entire Arabic experience must use proper RTL.

English should support proper LTR.

---

# MOST IMPORTANT OBJECTIVE

I do NOT want a normal restaurant template.

I want the client to open the website and immediately think:

**"واو... هذا الموقع فعلاً لمطعمي؟"**

The website should look like a restaurant brand that invested heavily in professional branding and web design.

It should feel:

* luxurious
* cinematic
* authentic
* Jordanian / Levantine
* modern
* appetizing
* warm
* premium
* elegant
* highly polished

The food photography should be the main visual hero.

---

# REFERENCE IMAGES ARE CRITICAL

Before designing anything:

## Analyze ALL uploaded images carefully.

They include real visual references for:

* مطعم الكمال storefront
* restaurant colors
* logo direction
* black/gold branding
* chef uniform
* falafel
* falafel sandwich
* foul
* hummus
* hummus with meat
* eggs
* sausage and eggs
* tomato dishes
* traditional breakfast dishes

These images define the website identity.

DO NOT ignore them.

DO NOT replace them with random restaurant stock images.

Use my uploaded photographs throughout the website.

Smartly crop them.

Never stretch them.

Keep food looking realistic.

---

# VISUAL DIRECTION

The uploaded storefront and uniform clearly suggest a premium visual system based on:

### Black

### Warm Gold

### Amber lighting

### Dark wood

### Cream

### Traditional Levantine food

Suggested palette:

```text
Deep Black        #080808
Luxury Black      #0D0D0D
Charcoal          #151515
Warm Charcoal     #1D1A17
Luxury Gold       #C99A46
Warm Gold         #D9AA55
Amber             #E2AE57
Warm Cream        #F2E4C8
Soft White        #F7F3EB
```

Do not use:

* purple gradients
* blue SaaS colors
* neon
* excessive white backgrounds
* generic colorful restaurant palettes

This website should visually belong to **مطعم الكمال**.

---

# DESIGN PHILOSOPHY

Think:

**Luxury Arabic Restaurant × Cinematic Food Photography × Modern Premium Digital Experience**

Use:

* dark backgrounds
* black panels
* subtle dark gradients
* warm lighting
* thin gold lines
* elegant borders
* premium Arabic typography
* massive food photography
* intentional whitespace
* smooth motion
* subtle depth
* layered images
* tasteful shadows
* dark wood textures
* warm cream accents

Avoid putting everything inside identical rounded cards.

The website needs visual variety.

Sections should feel designed, not generated from a template.

---

# HOMEPAGE EXPERIENCE

Create a cinematic homepage with strong storytelling.

Recommended structure:

1. Cinematic Hero
2. Quick Categories
3. Signature Dishes
4. Large Food Showcase
5. Most Popular
6. Brand Statement
7. Menu Preview
8. Authentic Experience Section
9. Restaurant Story
10. Chef / Brand Identity
11. Storefront Section
12. Testimonials
13. Location & Opening Hours
14. Final Order CTA
15. Luxury Footer

Do not make sections feel disconnected.

Use transitions so the page feels like one visual journey.

---

# HERO SECTION

This must be visually outstanding.

Use one of the strongest uploaded images.

Potentially use:

* storefront
* falafel sandwich
* hummus
* food close-up

Create a cinematic composition.

Ideas:

Large food image occupying most of screen.

Dark gradient from one side.

Subtle gold glow.

Small elegant Arabic eyebrow:

**مطعم الكمال**

Main headline:

# أكل شعبي... بطعم الكمال

or:

# نكهة الكمال

Supporting text can communicate:

أصالة الأكل الشعبي بنكهة نحضرها كل يوم بعناية.

Keep it short.

Primary CTA:

# اطلب الآن

Secondary CTA:

# اكتشف المنيو

Add a subtle scroll indicator.

Animations should feel smooth and expensive.

---

# HERO MOTION

Use subtle cinematic motion such as:

* very slow image scale
* gentle parallax
* soft fade
* text reveal
* gold line animation
* smooth CTA hover

Do NOT create exaggerated animations.

Do NOT make food float around like a gaming website.

---

# NAVBAR

Create a premium transparent navbar over the hero.

When scrolling, transition into a dark blurred navbar.

Brand:

**مطعم الكمال**

Navigation:

* الرئيسية
* المنيو
* الأكثر طلباً
* قصتنا
* موقعنا

Actions:

* Search
* Cart
* AR / EN
* اطلب الآن

The mobile navbar must be custom designed.

Do NOT use a boring generic hamburger drawer.

Create a beautiful full-screen or premium dark mobile menu.

---

# QUICK CATEGORY NAVIGATION

After the hero, display beautiful quick menu categories.

Possible example categories:

* فلافل
* حمص
* فول
* سندويشات
* بيض
* قلايات
* فطور
* إضافات

For now, use mock data.

Design category buttons creatively.

Do not use generic huge rectangular cards.

Possible style:

Small circular image previews with elegant Arabic labels.

Or elegant horizontal category navigation.

---

# SIGNATURE FOOD SECTION

Create a section focused on the food itself.

Headline example:

# أطباق تحكي عن نفسها

Use the uploaded images in an editorial magazine-style composition.

Example layout:

Large photo on left.

Two stacked photos on right.

Floating typography.

Subtle overlapping images.

On mobile convert gracefully into a vertical composition.

The goal is to make the user hungry.

---

# BIG CINEMATIC FOOD MOMENTS

At least 2–3 sections should use nearly full-width food imagery.

For example:

A large hummus photograph.

Overlay:

**حمص الكمال**

small description

and elegant CTA.

Another section could showcase falafel.

Another section could showcase breakfast.

Do not show every product in small cards.

---

# MENU PREVIEW

Create a visually premium preview of the restaurant menu.

Products can initially use mock data such as:

### فلافل

Crunchy authentic falafel.

### سندويشة فلافل

### حمص

### حمص باللحمة

### فول

### بيض

### بيض وسجق

### قلاية بندورة

### بطاطا وبيض

Prices should currently be DEMO values only.

Put all mock products inside a clearly centralized frontend data file such as:

```text
src/data/menu.ts
```

or equivalent.

I need to easily replace the data later.

---

# MENU PAGE

Create a dedicated:

`/menu`

page.

This page must feel premium and highly usable.

Include:

* large page intro
* category filters
* search
* products
* smooth filter transitions
* sticky categories where appropriate

Search placeholder:

# شو عبالك اليوم؟

Use tasteful Jordanian Arabic.

---

# FOOD PRODUCT DESIGN

Each item should include:

* image
* Arabic name
* English name if needed
* short description
* demo price
* availability
* add button

Design products elegantly.

Avoid repetitive ecommerce cards.

Some products can use horizontal layouts.

Some highlighted products can be larger.

Most Popular items can have special presentation.

---

# PRODUCT DETAIL EXPERIENCE

Clicking a product should open a premium product detail experience.

Desktop:

Elegant large modal or side panel.

Mobile:

Premium bottom sheet.

Display:

* huge food image
* product title
* description
* price
* quantity selector
* optional extras
* notes
* Add to Cart

Example extras for demo:

* حمص إضافي
* خضار إضافية
* فلافل إضافية
* خبز إضافي
* صوص إضافي

Again:

NO DATABASE.

Use frontend mock data.

---

# CART EXPERIENCE

Build a complete interactive frontend cart.

The cart should visually work.

Users can:

* add item
* remove item
* increase quantity
* decrease quantity
* add notes
* choose extras
* see subtotal
* see delivery
* see demo discount
* see total

Use frontend state only.

LocalStorage is allowed for DEMO cart persistence.

Do not create backend persistence.

---

# ADD TO CART INTERACTION

When clicking Add:

Use elegant animation.

Example toast:

# تمت الإضافة لطلبك

The cart icon should update its item count.

Make the interaction feel extremely polished.

---

# CART DRAWER

On desktop:

Use a beautiful dark slide-out cart.

On mobile:

Use a full-screen or nearly full-screen cart experience.

Cart empty message:

# لسا ما اخترت طلبك 👀

# اكتشف منيو الكمال واختار اللي عبالك.

Button:

# تصفح المنيو

---

# CHECKOUT FRONTEND DEMO

Create:

`/checkout`

The checkout page should visually demonstrate how real ordering will work later.

Do NOT submit anything to a backend.

Fields:

* الاسم
* رقم الهاتف
* استلام من المطعم / توصيل
* المنطقة
* الشارع
* رقم المبنى
* الطابق
* تفاصيل إضافية
* ملاحظات الطلب

Show a beautifully designed order summary.

Payment options can visually show:

* الدفع عند الاستلام
* الدفع عند التوصيل

No real payment integration.

---

# CHECKOUT SUCCESS DEMO

When clicking the final order button:

Simulate success in frontend.

Display a beautiful confirmation page.

For example:

# تم استلام طلبك بنجاح

Fake demo order number:

`AK-1027`

Display:

* order number
* items
* total
* delivery type
* estimated preparation status

Clearly structure the frontend so I can later connect this button to my backend.

---

# ORDER TRACKING FRONTEND

Create:

`/track-order`

Beautiful tracking interface.

Inputs:

* رقم الطلب
* رقم الهاتف

For now use mock order examples.

Example timeline:

1. تم استلام الطلب
2. قيد التحضير
3. جاهز
4. خرج للتوصيل
5. تم التوصيل

Show the progress as an elegant vertical or horizontal timeline.

No actual API.

---

# MOBILE EXPERIENCE IS EXTREMELY IMPORTANT

Most restaurant customers will order from their phone.

Mobile design should NOT simply be compressed desktop.

Create intentional mobile UX.

Potential bottom navigation:

* الرئيسية
* المنيو
* الطلب
* تتبع الطلب

Use icons + Arabic labels.

Make it elegant and minimal.

Cart should always remain easy to access.

---

# BRAND STORY

Create an elegant section about مطعم الكمال.

Headline:

# من قلب الأكل الشعبي

or:

# حكاية الكمال

Use short, emotional copy.

Example brand direction:

أكلات بنعرفها من زمان، بنقدمها بطعم نحبه كل يوم.

Do not write giant paragraphs.

Use the uploaded storefront image as a visual storytelling element.

---

# STOREFRONT IMAGE

The uploaded photo of the restaurant exterior is very important.

Create a cinematic section around it.

Possible execution:

Full-width image.

Dark vignette.

Gold typography.

Text:

# هون بتبدأ نكهة الكمال

Include placeholder location information that I can replace later.

---

# CHEF BRANDING

I uploaded a branded chef-uniform reference.

Use it tastefully.

Create a premium section representing:

* quality
* preparation
* identity
* professionalism

Do NOT make it look like a corporate employee page.

Use the black and gold uniform as inspiration for the entire website UI.

---

# WHY AL KAMAL

Create a small elegant benefits area.

Examples:

## مكونات طازجة

## تحضير يومي

## نكهة أصيلة

## خدمة سريعة

Keep it visually premium.

Do not make it look like SaaS feature cards.

---

# MOST POPULAR

Create a section:

# الأكثر طلباً

Use your strongest food photographs here.

Make this section visually different from the main menu.

Potential layout:

Large featured item + supporting items.

Do not make everything equal size.

---

# TESTIMONIALS

Create elegant mock testimonials.

Title:

# شو بحكوا عن الكمال؟

Use natural Jordanian-style short testimonials.

For example:

"الفلافل من الآخر 🔥"

"الحمص عندهم لازم تجربه."

"أكل مرتب وطعم فعلاً مميز."

Do not overdo emojis.

Make reviews editable from a local data file for now.

---

# LOCATION SECTION

Create:

# وين بتلاقينا؟

Include a beautiful map placeholder / map component visually.

Show mock:

* location
* phone
* opening hours
* directions button

Do NOT integrate a backend.

Google Maps embed is optional if easy.

---

# OPENING HOURS UI

Design beautiful opening-hours display.

For demo:

Saturday – Thursday

7:00 AM – 12:00 AM

Friday

8:00 AM – 12:00 AM

These are DEMO values.

Keep them in centralized configuration so I can change them easily.

---

# WHATSAPP

Create an elegant WhatsApp action.

Do NOT add a giant cheap-looking floating button.

Keep it small, subtle and premium.

Make the phone number a frontend config variable.

---

# FOOTER

Create an exceptional dark footer.

Include:

**مطعم الكمال**

**أكل شعبي... بطعم الكمال**

Links:

* الرئيسية
* المنيو
* قصتنا
* موقعنا
* تتبع الطلب

Contact placeholders.

Social media placeholders.

Thin gold lines.

Premium typography.

---

# ADMIN PANEL — FRONTEND DEMO ONLY

I ALSO WANT THE CLIENT TO SEE HOW THEIR FUTURE ADMIN SYSTEM WILL LOOK.

Create:

`/admin`

But this is currently only a frontend prototype.

NO DATABASE.

NO BACKEND.

NO REAL AUTH.

NO SERVER.

Create a beautiful admin login screen.

For presentation purposes only, you may use temporary frontend demo access:

Password:

```text
alkamal@2026
```

IMPORTANT:

This is NOT production security.

It exists only so I can demonstrate the dashboard to the restaurant owner.

Keep it isolated and easy to remove later when I implement real backend authentication.

---

# ADMIN LOGIN VISUAL DESIGN

Create an extremely premium login screen.

Use:

* black background
* gold logo
* restaurant branding
* subtle food background image
* dark overlay
* elegant password field

Heading:

# لوحة إدارة الكمال

Subtitle:

# إدارة الطلبات والمنيو من مكان واحد

---

# ADMIN DASHBOARD FRONTEND

Create a realistic admin dashboard UI.

Sidebar:

* لوحة التحكم
* الطلبات
* الأصناف
* الأقسام
* العروض
* مناطق التوصيل
* محتوى الموقع
* الإعدادات
* تسجيل الخروج

Everything should visually work using mock state.

---

# ADMIN DASHBOARD HOME

Create cards for demo statistics:

## طلبات اليوم

`47`

## مبيعات اليوم

`326.75 JOD`

## قيد التحضير

`8`

## قيد التوصيل

`4`

## مكتملة

`35`

Add a premium revenue chart.

Add popular products.

Add recent orders.

This is MOCK DATA ONLY.

---

# ADMIN ORDERS PAGE

Create a realistic order-management UI.

Example order:

## AK-1048

**أحمد محمد**

2 × سندويشة فلافل
1 × حمص
1 × فول

Total:

`5.75 JOD`

Status:

**قيد التحضير**

Allow frontend-demo status buttons:

* قبول الطلب
* بدء التحضير
* جاهز
* خرج للتوصيل
* تم التوصيل
* إلغاء

Changing status should update frontend mock state so the client can see the interaction.

No database.

---

# ADMIN ORDER DETAIL

When clicking an order show:

* order number
* customer
* phone
* address
* delivery/pickup
* order items
* quantity
* extras
* notes
* subtotal
* delivery
* total
* payment method
* status
* timeline

Use a polished side panel or page.

---

# PRODUCT MANAGEMENT FRONTEND

Create:

# إدارة الأصناف

Display mock products.

Allow frontend demo interactions:

* Add
* Edit
* Delete
* Toggle availability
* Featured toggle

Opening Add Product should show a proper form:

* صورة الصنف
* الاسم بالعربي
* الاسم بالإنجليزي
* التصنيف
* الوصف
* السعر
* الخصم
* متوفر
* الأكثر طلباً

Changes only need to live in local frontend state.

Do NOT store them remotely.

---

# CATEGORY MANAGEMENT DEMO

Create categories UI.

Allow frontend demo:

* add
* edit
* delete
* reorder
* active/inactive

Use mock state.

---

# DELIVERY AREA DEMO

Create mock areas such as:

خلدا — 1.50 JOD

تلاع العلي — 1.50 JOD

الجبيهة — 2.00 JOD

These are purely DEMO.

Allow frontend editing.

---

# ADMIN RESPONSIVE DESIGN

Admin dashboard must also look excellent on:

* laptop
* tablet
* mobile

On mobile convert large tables into clean cards when necessary.

---

# FRONTEND ARCHITECTURE

This is very important because I will connect the backend later.

Separate UI from data.

Example structure:

```text
components/
pages/
data/
hooks/
types/
utils/
config/
```

Keep mock data inside dedicated files.

Do NOT scatter menu data throughout components.

For example:

```text
data/menu.ts
data/orders.ts
data/categories.ts
data/reviews.ts
config/restaurant.ts
```

Create clear TypeScript interfaces/types.

---

# FUTURE BACKEND READINESS

Build service abstractions where useful.

For example the UI can internally use functions like:

```text
getProducts()
getOrders()
createOrder()
updateOrderStatus()
```

But for NOW these functions must use local/mock data.

Do not build actual APIs.

This will make it easier for me to replace the mock service implementation with my real backend later.

---

# RESPONSIVENESS

Test carefully on:

* 1920px desktop
* laptop
* iPad
* Android
* iPhone
* small phone screens

No:

* text overflow
* image distortion
* broken RTL
* horizontal scrolling
* overlapping content
* tiny buttons

---

# ARABIC DESIGN

Arabic is NOT an afterthought.

The website must look naturally Arabic.

Proper RTL:

* navigation
* content
* cart
* menu
* forms
* admin dashboard
* checkout

Do not simply mirror a western template.

Choose a premium Arabic-friendly font.

Use visually strong Arabic typography.

---

# ENGLISH LANGUAGE

Create language switching architecture.

Arabic default.

English alternative.

No need for backend translation system.

Keep strings organized.

---

# ANIMATION QUALITY

Animations should be:

* elegant
* controlled
* cinematic
* smooth
* premium

Use:

* scroll reveal
* subtle parallax
* image zoom
* stagger
* hover transitions
* smooth cart transitions
* navbar transformations
* page transitions

Avoid:

* bouncing everything
* spinning icons
* excessive glow
* gaming effects
* cheap animation presets

---

# MICRO INTERACTIONS

Make every small interaction polished.

Button hover.

Image hover.

Quantity controls.

Category switch.

Add to cart.

Cart opening.

Menu filtering.

Form focus.

Admin status changes.

Navigation transition.

These details should feel professionally designed.

---

# FOOD PHOTOGRAPHY

The food photographs are the star.

I want customers to almost taste the food from the screen.

Use:

* large photography
* warm tone
* sharp detail
* proper cropping
* depth
* shadows
* elegant composition

Do NOT cover food images with excessive text.

---

# IMAGE PERFORMANCE

Uploaded images may be large.

Optimize frontend image loading.

Use:

* lazy loading
* responsive sizes
* optimized formats where appropriate
* loading placeholders

But never destroy image quality.

---

# LOADING EXPERIENCE

Create a tasteful loading state.

Could use:

**مطعم الكمال**

with a subtle gold animation.

Keep it extremely short.

---

# CUSTOM CURSOR / ADVANCED EFFECTS

Only add custom cursor effects if they actually improve desktop luxury feel.

Never use them on mobile.

Do not make navigation annoying.

---

# SCROLL EXPERIENCE

The homepage should feel like a cinematic journey.

Examples:

As user scrolls:

Food photography gently enters.

Text reveals.

Dark section transitions into warm cream section.

Then returns into black.

The experience should have rhythm.

Do not simply stack identical sections.

---

# IMPORTANT: DO NOT DO THIS

Do not make it look like:

* SaaS
* dashboard company
* technology startup
* cheap restaurant template
* WordPress theme
* fast-food franchise
* generic AI-generated site

Avoid excessive:

* glass cards
* pills
* gradients
* rounded rectangles

---

# NO BACKEND

I am repeating this intentionally.

DO NOT create:

* Supabase project
* database
* SQL
* authentication backend
* REST API
* server actions
* serverless functions
* cloud functions
* Firebase
* Prisma
* PostgreSQL
* real CMS
* real payment processing

I WILL BUILD ALL OF THAT LATER.

Focus your effort and context window on:

# FRONTEND QUALITY.

---

# PRIORITY ORDER

If development time or context becomes limited, prioritize in this order:

1. Homepage visual quality
2. Mobile design
3. Menu experience
4. Food photography presentation
5. Cart UX
6. Checkout UX
7. Animations
8. Responsive behavior
9. Admin dashboard visual prototype
10. Additional pages

Do NOT sacrifice frontend quality to build fake backend infrastructure.

---

# CLIENT PRESENTATION QUALITY

Remember:

This version will be presented directly to the restaurant owner.

The purpose is to make them visualize what their final platform can become.

Every screen should feel finished enough for a professional sales presentation.

There should be NO:

* Lorem Ipsum
* developer placeholders
* broken links
* empty ugly sections
* unfinished components
* debug labels
* random technical text

---

# FINAL TEST

Before finishing, manually inspect:

## Customer flow

Homepage

→ Explore food

→ Menu

→ Product details

→ Add product

→ Cart

→ Checkout

→ Demo order confirmation

→ Demo tracking

## Admin Demo

Admin login

→ Dashboard

→ Orders

→ Open order

→ Change mock status

→ Products

→ Edit mock product

→ Add mock product

→ Categories

→ Delivery areas

Everything should LOOK and FEEL connected even though it is frontend-only.

---

# FINAL VISUAL STANDARD

The final result should feel like:

**مطعم الكمال تحول من مطعم محلي إلى Brand احترافي كامل.**

The combination of:

* black
* luxury gold
* warm restaurant lighting
* authentic Arabic typography
* real restaurant photography
* delicious food close-ups
* elegant animation
* responsive ordering experience

must create a memorable identity.

I do not want merely a "nice website."

I want a website that makes the restaurant owner stop scrolling and say:

# "هذا بالزبط اللي بدي إياه."

Build the frontend to that level.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
