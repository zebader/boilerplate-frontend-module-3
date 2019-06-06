# Project Name

TIPPJAR

## Description

TIPPJAR is an app that help business to improve the customer service and the customer retention/adqusition by creating a gamifiyed promotion, where the customers can tip the workers and get points in exchange to get exclusive discounts or gifts.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up as a customer so that I can start tiping and getting points, or as a business so I can start adding workers or promotions.
-  **Login:** As a user I can login to the platform so that I can see my dashboard
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Manage worker** As a business I can add, edit or delete workers to my dashboard
-  **Manage Promotion** As a business I can add, edit or delete promotions to my dashboard
-  **User profile** As a user I can modify my personal information
-  **Manage Wallet** As a customer I can add or remove balance in my wallet so I can use it for tip workers from every screen
-  **Pin business** As a customer I can pin business with promotions to my dashboard
-  **Search Promotions** As a customer I want to search business with promotions
-  **See workers** As a customer I want to see all the workers I can tip in a business
-  **See promo details** As a customer I want to see the promotion detail of each business
-  **Tip and rate** As a customer I can tip and rate the worker so I can get points
-  **Get promotion** As a customer I can get the promotion if I have enough points

## Backlog

Others
- Create Workers profile, so they can read comments, recieve messages, get paid (create roles in business profile?)
- Send to ubication (google maps) by clicking the name in the business profile
- See other user profile
- Send points or cash to them (make gifts)

Sign UP:
- Google Auth

business dashboard and flow
- Pay workers
- Get benefits ( % of tips)
- Create Factor for points (how difficult is to get the points)
- Create special promotions ( points x2, timers...)
- Spotlight a promo by special payment

Customer dashboard and flow
- Filter shopType
- Create a ranking by Total points (special promotions if you are the top 10 (points x2, etc...))
- Status by amount of points
- Add Hot and all filter in the business promotions screen (spotlighted promos)
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
| `post`  | `/business/workers/add` | WorkersAddComponent| business only | Create a worker and and redirect to dashboard
| `post`  | `/business/promotions/add` | PromotionAddComponent| business only | Create a promotion and redirect to dashboard
| `put` | `/business/workers/:id/update` | WorkersAddComponent  | business only | Edit a worker and redirect to dashboard
| `put` | `/business/promotions/:id/update` | PromotionAddComponent | business only | Edit a promotion and redirect to dashboard
| `delete` | `/business/workers/:id/delete` |n/a | business only | Delete a worker and redirect to dashboard
| `delete` | `/business/promotions/:id/delete` | n/a | business only | Delete a promotion and redirect to dashboard
| `get`  | `/business/:id` | businessDetailsComponent| business only | show business information and redirect to dashboard
| `put`  | `/business/:id/update` | businessDetailsComponent| business only | edit business information and redirect to dashboard
| `get`  | `/customer` | CustomerDashboardListComponent| customer only | shows all pinned business from customer, link to wallet, business and profile
| `get`  | `/customer/:id` | CustomerDetailsComponent| customer only | Show user details
| `put`  | `/customer/:id/update` | CustomerDetailsComponent| customer only | Edit user details
| `get`  | `/customer/wallet` | WalletComponent| customer only | render wallet to add balance
| `put`  | `/customer/wallet/update` | WalletComponent | customer only | manage balance and redirect to /customer
| `get`  | `/promotions` | AvaliablePromotionsComponent| customer only | List of the business with promotions link to business profile
| `get`  | `/promotions/:id` | PromotionComponent| customer only | show business promotion profile with points, promotion progress bar and workers to tip
| `get`  | `/promotions/:id/:workerId` | TipWorkerComponent | customer only | show form to tip and rate worker
| `put`  | `/promotions/:id/:workerId/update` | TipWorkerComponent | customer only | add/ update tip, rate to worker redirect to updated /promotions/:id 
| `get`  | `/promotions/:id/:promoId` | GetPromotionDetailsComponent | customer only | show promotion details and if avaliable QR code
| `put`  | `/promotions/:id/:promoId/update` | GetPromotionDetailsComponent | customer only | gt the promotion push user to promoID and redirect to updated /promotions/:id
| `get` | `**` | NotFoundComponent | public | 

## Components

- SplashComponent
  - SplashSliderComponent
  - SignUpButtonComponent

- SignupComponent
  - SignUpCustomerComponent
  - SignUpbusinessComponent

- LogInComponent

- businessDetailsComponent

- WorkersListComponent
  - businessDetailsCardComponent
  - WorkersCardListComponent
    - SearchWorkerComponent
    - WorkerCardComponent
    - AddWorkerButtonComponent

- PromotionListComponent
  - businessDetailsCardComponent
  - PromotionListCardComponent
    - SearchWorkerComponent
    - PromotionCardComponent
    - AddPromotionButtonComponent

- WorkersAddComponent

- PromotionAddComponent

- CustomerDashboardListComponent
  - WalletTopBarComponent
  - CustomerDetailsCardComponent
  - PinnedbusinessCardListComponent
    - SearchPinnedbusinessComponent
    - PinnedbusinessCardComponent
  - FooterNavBarComponent

- CustomerDetailsComponent

- WalletComponent

- AvaliablePromotionsComponent
  - WalletTopBarComponent
  - AvaliablePromotionsCardListComponent
    - AvaliablePromotionsCardComponent
  - FooterNavBarComponent

- PromotionComponent
  - WalletTopBarComponent
  - PromotionbusinessHeaderComponent
  - PromotionProgressCardComponent
  - PromotionsCardListComponent
    - SearchPromotionsComponent
    - PromotionsCardComponent
  - FooterNavBarComponent

- TipWorkerComponent

- GetPromotionDetailsComponent

NotFoundComponent 

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- business Service
  - business.getAllWorkers()
  - business.addWorker()
  - business.getAllPromotions()
  - business.addPromotion()
  - business.updateWorker(workerdId,body)
  - business.updatePromotion(promoId,body)
  - business.deleteWorker(workeIid)
  - business.deletePromotion(promoId)
  - business.getAllbusinesses()
  - business.getbusiness(id)
  - business.updatebusiness(id,body)
- Customer Service
  - customer.getCustomerDetails(id)
  - customer.updateCustomerDetails(id,body)
  - customer.getWallet(id)
  - customer.updateWallet(id,body)
  - customer.getAllpromotion()
  - customer.getPromotion(id)
  - customer.getAllworkers()
  - customer.getWorker(workerId)
  - customer.updateWorker(workerId,body)
  - customer.getPromotion(promoId)
  - customer.updatePromotion(promoId, body)

# Server

## Models

business model

```
username - String // required
email - String // required & unique
password - String // required
userType - String
imgurl - String
location - String // required
workers - [ type:ObjetcId - ref :'Worker']
promotion - [ type:ObjetcId - ref :'Promotion']

}]
--------------------------backlog
pointsFactor - Number
benefits - Number
totalPoints - Number
spotlighted - Boolean
businessType - String
mapLocation - String

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
pinnedbusiness - [{
  businessID - [ type: ObjetcId - ref :'business']
  points - Number
}]
--------------------------backlog
status - String
totalPoints - Number

```
Worker model

```

  name - String // required
  type - String
  rating - []
  tips - Number

```
Promotion model

```
  name - String // required
  type - String
  pointsToUnlock - Number // required
  userID - [ type:ObjetcId - ref :'Customer']
  qrCode - String

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

- POST /business/workers/add
  - 401 if user logged in
  - body:
    - Worker name
    - type of work
    - worker img
  - validation
    - fields not empty (422)
    - workerId exists (404) 
  - store worker in business collection
  - 200 with worker object
- POST /business/promotions/add
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
  - store promotion in business collection
  - 200 with promotion object
- PUT /business/workers/:workerId/update
  - 401 if user logged in
  - body:
    - Worker name
    - type of work
    - worker img
  - validation
    - fields not empty (422)
    - workerId exists (404) 
  - update worker in business collection
  - 200 with worker object
- PUT /business/promotions/:promoId/update
  - 401 if user logged in
  - body:
    - Product/service name
    - type of promotion
    - product img
    - points
  - validation
    - fields not empty (422)
    - productId exists (404) 
    - same points (404) 
  - Update promotion in business collection
  - 200 with promotion object
- DELETE /business/workers/:workerId
  - 401 if user logged in
  - validation
    - workerId exists (404) 
  - remove from business collection
- DELETE /business/promotions/:promoId
  - 401 if user logged in
  - validation
    - promoId exists (404) 
  - remove from business collection
- GET /business/:id
  - 200 with business data
- PUT /business/:id/update
  - 401 if user logged in
  - body:
    - username
    - adress
    - edit img
  - validation
    - fields not empty (422)
    - Update business in business collection

- GET /customer
  - 200 with array of pinnedbusiness
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
  - 200 array of all business
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
  - Update worker in business collection
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
