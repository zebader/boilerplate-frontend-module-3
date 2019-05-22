# Project Name

KING OF TIPS

## Description

King of Tips is an app that help bussines to improve the customer service and the customer retention/adqusition by creating a gamifiyed promotion, where the customers can tip the workers and get points in exchange to get exclusive discounts or gifts.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up as a customer so that I can start tiping and getting points, or as a bussines so I can start adding workers or promotions.
-  **Login:** As a user I can login to the platform so that I can see my dashboard
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Manage worker** As a bussines I can add, edit or delete workers to my dashboard
-  **Manage Promotion** As a bussines I can add, edit or delete promotions to my dashboard
-  **User profile** As a user I can modify my personal information
-  **Manage Wallet** As a customer I can add or remove balance in my wallet so I can use it for tip workers from every screen
-  **Pin bussines** As a customer I can pin bussines with promotions to my dashboard
-  **Search Promotions** As a customer I want to search bussines with promotions
-  **See workers** As a customer I want to see all the workers I can tip in a bussines
-  **See promo details** As a customer I want to see the promotion detail of each bussines
-  **Tip and rate** As a customer I can tip and rate the worker so I can get points
-  **Get promotion** As a customer I can get the promotion if I have enough points

## Backlog

Others
- Create Workers profile, so they can read comments, recieve messages, get paid (create roles in bussines profile?)
- Send to ubication (google maps) by clicking the name in the bussines profile
- See other user profile
- Send points or cash to them (make gifts)

Sign UP:
- Google Auth

Bussines dashboard and flow
- Pay workers
- Get benefits ( % of tips)
- Create Factor for points (how difficult is to get the points)
- Create special promotions ( points x2, timers...)
- Spotlight a promo by special payment

Customer dashboard and flow
- Filter shopType
- Create a ranking by Total points (special promotions if you are the top 10 (points x2, etc...))
- Status by amount of points
- Add Hot and all filter in the bussines promotions screen (spotlighted promos)
- Add comments when tipping
- Read comments from workers
  
# Client

## Routes
| Method | Path | Component | Permissions | Behavior | 
|--------|------|--------|----------| -------|
| `get`  | `/` | SplashComponent| public | splash screen with information about the APP and auth buttons |
| `post` | `/auth/signup` | SignupComponent| anon only| signup form, link to login, navigate to dashboard after signup|
| `post` | `/auth/login` | LoginComponent | anon only |login form, link to signup, navigate to dashboard after login |
| `post` | `/auth/logout` | n/a| anon only | navigate to splash after logout, expire session |

| `get`  | `/bussines/workers` | WorkersListComponent| bussines only | shows all workers, links to add, edit or delete worker
| `get`  | `/bussines/promotions` | PromotionListComponent| bussines only | shows all promotions, links to add, edit or delete promotion
| `post`  | `/bussines/workers/add` | WorkersAddComponent| bussines only | Create a worker and and redirect to dashboard
| `post`  | `/bussines/promotions/add` | PromotionAddComponent| bussines only | Create a promotion and redirect to dashboard
| `put` | `/bussines/workers/:workerId/update` | WorkersAddComponent  | bussines only | Edit a worker and redirect to dashboard
| `put` | `/bussines/promotions/:promoId/update` | PromotionAddComponent | bussines only | Edit a promotion and redirect to dashboard
| `delete` | `/bussines/workers/:workerId` |n/a | bussines only | Delete a worker and redirect to dashboard
| `delete` | `/bussines/promotions/:promoId` | n/a | bussines only | Delete a promotion and redirect to dashboard
| `get`  | `/bussines/:id` | BussinesDetailsComponent| bussines only | show bussines information and redirect to dashboard
| `put`  | `/bussines/:id/update` | BussinesDetailsComponent| bussines only | edit bussines information and redirect to dashboard

| `get`  | `/customer` | CustomerDashboardListComponent| customer only | shows all pinned bussines from customer, link to wallet, bussines and profile
| `get`  | `/customer/details` | CustomerDetailsComponent| customer only | Show user details
| `put`  | `/customer/details/update` | CustomerDetailsComponent| customer only | Edit user details
| `get`  | `/customer/wallet` | WalletComponent| customer only | render wallet to add balance
| `put`  | `/customer/wallet/update` | WalletComponent | customer only | manage balance and redirect to /customer
| `get`  | `/promotions` | AvaliablePromotionsComponent| customer only | List of the bussines with promotions link to bussines profile
| `get`  | `/promotions/:id` | PromotionComponent| customer only | show bussines promotion profile with points, promotion progress bar and workers to tip
| `get`  | `/promotions/:id/:workerId` | TipWorkerComponent | customer only | show form to tip and rate worker
| `put`  | `/promotions/:id/:workerId/update` | TipWorkerComponent | customer only | add/ update tip, rate to worker redirect to updated /promotions/:id 
| `get`  | `/promotions/:id/:promoId` | GetPromotionDetailsComponent | customer only | show promotion details and if avaliable QR code
| `post`  | `/promotions/:id/:promoId/add` | GetPromotionDetailsComponent | customer only | gt the promotion push user to promoID and redirect to updated /promotions/:id

| `get` | `**` | NotFoundComponent | public | 

## Components

SplashComponent
-- SplashSliderComponent
-- SignUpButtonComponent

SignupComponent
-- SignUpCustomerComponent
-- SignUpBussinesComponent

LogInComponent

BussinesDetailsComponent

WorkersListComponent
-- BussinesDetailsCardComponent
-- WorkersCardListComponent
---- SearchWorkerComponent
---- WorkerCardComponent
---- AddWorkerButtonComponent

PromotionListComponent
-- BussinesDetailsCardComponent
-- PromotionListCardComponent
---- SearchWorkerComponent
---- PromotionCardComponent
---- AddPromotionButtonComponent

WorkersAddComponent

PromotionAddComponent

CustomerDashboardListComponent
-- WalletTopBarComponent
-- CustomerDetailsCardComponent
-- PinnedBussinesCardListComponent
---- SearchPinnedBussinesComponent
---- PinnedBussinesCardComponent
-- FooterNavBarComponent

CustomerDetailsComponent

WalletComponent

AvaliablePromotionsComponent
-- WalletTopBarComponent
-- AvaliablePromotionsCardListComponent
---- AvaliablePromotionsCardComponent
-- FooterNavBarComponent

PromotionComponent
-- WalletTopBarComponent
-- PromotionBussinesHeaderComponent
-- PromotionProgressCardComponent
-- PromotionsCardListComponent
---- SearchPromotionsComponent
---- PromotionsCardComponent
-- FooterNavBarComponent

TipWorkerComponent

GetPromotionDetailsComponent

NotFoundComponent 

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Bussines Service
  - restaurant.search(terms) axios

# Server

## Models

Bussines model

```
username - String // required
email - String // required & unique
password - String // required
userType - String
imgurl - String
location - String // required
mapLocation - String
workers - [{
  workerId - String // required
  name - String // required
  type - String
  rating - []
  tips - Number
}]
promotion - [{
  promoID -String // required
  name - String // required
  type - String
  pointsToUnlock - Number // required
  userID - [ type:ObjetcId - ref :'Customer']
  qrCode - String
}]
--------------------------backlog
pointsFactor - Number
benefits - Number
totalPoints - Number
spotlighted - Boolean
bussinesType - String

```
Customer model

```
username - String // required
email - String // required & unique
password - String // required
userType - String
imgurl - String
location - String
balance - Number // required
pinnedBussines - [{
  bussinesID - [ type: ObjetcId - ref :'Bussines']
  points - Number
}]
--------------------------backlog
status - String
totalPoints - Number

```

## API Endpoints (backend routes)

- GET /auth/me
  - 404 if no user in session
  - 200 with user object
- POST /auth/signup
  - 401 if user logged in
  - body:
    - username
    - adress
    - email
    - add img
    - password
  - validation
    - fields not empty (422)
    - user not exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object
- POST /auth/login
  - 401 if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty (422)
    - user exists (404)
    - passdword matches (404)
  - store user in session
  - 200 with user object
- POST /auth/logout
  - body: (empty)
  - 204

- GET /bussines/workers
  - 200 with array of workers
- GET /bussines/promotions
  - 200 with array of promotions
- POST /bussines/workers/add
  - 401 if user logged in
  - body:
    - Worker name
    - type of work
    - worker img
  - validation
    - fields not empty (422)
    - workerId exists (404) 
  - store worker in bussines collection
  - 200 with worker object
- POST /bussines/promotions/add
  - 401 if user logged in
  - body:
    - Product/service name
    - type of promotion
    - product img
    - points
  - validation
    - fields not empty (422)
    - productId exists (404) 
    - points exists (404) 
  - store promotion in bussines collection
  - 200 with promotion object
- PUT /bussines/workers/:workerId/update
  - 401 if user logged in
  - body:
    - Worker name
    - type of work
    - worker img
  - validation
    - fields not empty (422)
    - workerId exists (404) 
  - update worker in bussines collection
  - 200 with worker object
- PUT /bussines/promotions/:promoId/update
  - 401 if user logged in
  - body:
    - Product/service name
    - type of promotion
    - product img
    - points
  - validation
    - fields not empty (422)
    - productId exists (404) --------------------------------
    - same points (404) -----------------------------------
  - Update promotion in bussines collection
  - 200 with promotion object
- DELETE /bussines/workers/:workerId
  - 401 if user logged in
  - validation
    - workerId exists (404) 
  - remove from bussines collection
- DELETE /bussines/promotions/:promoId
  - 401 if user logged in
  - validation
    - promoId exists (404) 
  - remove from bussines collection
- GET /bussines/:id
  - 200 with bussines data
- PUT /bussines/:id/update
  - 401 if user logged in
  - body:
    - username
    - adress
    - edit img
  - validation
    - fields not empty (422)
    - Update bussines in bussines collection

- GET /customer
  - 200 with array of pinnedBussines
- GET /customer/details
  - 200 form with customer details
- PUT /customer/details/update
  - 401 if user logged in
  - body:
    - username
    - adress
    - add img
  - validation
    - fields not empty (422)
    - Update customer in customer collection
- GET /customer/wallet
  - 200 form with balance
- PUT /customer/wallet/update
  - 401 if user logged in
  - body:
    - add balance
  - validation
    - fields not empty (422)
    - Update balance in customer collection

- GET /promotions
  - 200 array of all bussines
- GET /promotions/:id
valido? monogoose validar isvalid
  - 200 array workers and promotion details card
- GET /promotions/:id/:workerId
  - 200 add tip form
- PUT /promotions/:id/:workerId/update
  - 401 if user logged in
  - body:
    - tip amount (user balance limited)
    - rating
  - validation
    - fields not empty (422)
  - Update worker in bussines collection
  - 200 with worker object redirect to /promotions/:id
- GET /promotions/:id/:promoId
  - 200 array workers and promotion details card
- POST /promotions/:id/:promoId/add
  - 401 if user logged in
  - QR ?

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/hycMN5tB/king-of-tips) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)