### **1️⃣ HTTP Status Codes Helper Library** 📌

Agar aap **hardcoded status codes (200, 400, 201, etc.)** ki jagah **readable constants** use karna chahte hain, toh **npm package `http-status`** best option hai.

#### **✅ Install Library**

```sh
npm install http-status
```

#### **✅ Usage in Code (Better Readability)**

```javascript
const httpStatus = require("http-status");

async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "Email and password required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, role },
  });

  res.status(httpStatus.CREATED).json({ message: "User created", user });
};
```

✅ **Benefits:**

- `httpStatus.BAD_REQUEST (400)` instead of `400`
- `httpStatus.CREATED (201)` instead of `201`
- **Code becomes more readable & maintainable**

---

### **2️⃣ Creating a Custom Helper for HTTP Responses**

Agar har jagah `res.status(code).json(...)` likhna tedious lagta hai, toh ek **custom helper function** bana sakte hain.

#### **✅ Create a Helper File (`helpers/response.js`)**

```javascript
const httpStatus = require("http-status");

const sendResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

module.exports = sendResponse;
```

#### **✅ Use in Your API**

```javascript
const sendResponse = require("../helpers/response");

async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      "Email and password required"
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, role },
  });

  sendResponse(res, httpStatus.CREATED, "User created", user);
};
```

✅ **Benefits:**

- **Code reuse** (No need to write `res.status(...).json(...)` again and again)
- **Cleaner & readable API responses**

---

### **3️⃣ Using an `asyncHandler` Library for Cleaner Async Code**

Jab aap **async functions** likhte hain, toh `try-catch` har request me likhna mushkil hota hai. **`express-async-handler`** package is problem ko solve karta hai.

#### **✅ Install Library**

```sh
npm install express-async-handler
```

#### **✅ Use in Code**

```javascript
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      "Email and password required"
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, role },
  });

  sendResponse(res, httpStatus.CREATED, "User created", user);
});

module.exports = registerUser;
```

✅ **Benefits of `express-async-handler`**

- **Automatically handles errors**
- No need to wrap `try-catch` in every async function
- **Makes controllers cleaner and shorter**

---

### **🚀 Final Summary**

| Feature                             | Solution                       |
| ----------------------------------- | ------------------------------ |
| ✅ **Better HTTP Status Handling**  | `http-status` package          |
| ✅ **Reusable API Response Helper** | Custom `sendResponse` function |
| ✅ **Cleaner Async Code**           | `express-async-handler`        |

### **💡 Example of Best Approach**

```javascript
const asyncHandler = require("express-async-handler");
const httpStatus = require("http-status");
const sendResponse = require("../helpers/response");
const bcrypt = require("bcryptjs");
const prisma = require("../prismaClient"); // Assuming Prisma client is initialized

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      "Email and password required"
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, role },
  });

  sendResponse(res, httpStatus.CREATED, "User created", user);
});

module.exports = registerUser;
```

---

🔥 \*\*Is approach se aapka API code clean, maintainable aur reusable ban jata hai.

Package Purpose
express Node.js framework for APIs.
prisma ORM CLI for database management.
@prisma/client Query builder for PostgreSQL.
pg PostgreSQL driver for Node.js.
bcryptjs Password hashing for security.
jsonwebtoken JWT-based authentication.
dotenv Store environment variables.
cors Enable cross-origin requests.
helmet Security middleware for Express.
joi Request data validation.
nodemon Auto-restart server on changes.

---

### **`next()` in Express.js – Kya Hai Aur Kaise Kaam Karta Hai?** 🚀

#### **🔹 `next()` Kya Hai?**

`next()` **Express.js ka ek built-in function** hai jo ek **middleware function se dusre middleware ya route handler tak control pass karta hai.**  
Agar `next()` ko **call nahi karte**, toh request wahi **stuck** ho jati hai aur **next middleware ya response send nahi hota**.

---

## **1️⃣ Basic Example – Without `next()` (Issue)**

Agar `next()` **call na karein**, toh request **stuck ho jayegi** aur browser **hang ho jayega**, kyunki koi response nahi mil raha.

```javascript
app.use((req, res) => {
  console.log("Middleware hit!");
  // ❌ No next() or res.send(), request will hang!
});
```

**🚨 Issue:**

- Yahan `next()` ya `res.send()` call nahi kiya gaya, toh browser ko kabhi response nahi milega.

---

## **2️⃣ Using `next()` to Move to the Next Middleware**

Agar ek **middleware function ka kaam ho gaya**, toh `next()` call karke **next middleware function ko control de sakte hain.**

```javascript
app.use((req, res, next) => {
  console.log("Middleware 1 executed");
  next(); // ✅ Move to the next middleware
});

app.use((req, res) => {
  res.send("Hello from Middleware 2");
});
```

🔍 **Flow:**  
1️⃣ `Middleware 1` execute hoga → `next()` call hoga  
2️⃣ `Middleware 2` execute hoga → Response send karega

✅ **Output:** `"Hello from Middleware 2"`

---

## **3️⃣ Using `next(error)` for Error Handling**

Agar kisi middleware me **error aaye**, toh hum `next(error)` use kar sakte hain **taake Express ka error-handling middleware use ho.**

```javascript
app.use((req, res, next) => {
  const error = new Error("Something went wrong!");
  next(error); // ❌ Move to error handler
});

// Error-handling middleware (Always at the end)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});
```

✅ **Agar error aaye toh `next(error)` error handler middleware tak control pass karega.**

---

## **4️⃣ Example with `express-async-handler`**

Jab **async functions me `express-async-handler`** use karte hain, toh `next(error)` **automatic handle hota hai**.

```javascript
const asyncHandler = require("express-async-handler");

app.get(
  "/test",
  asyncHandler(async (req, res, next) => {
    throw new Error("Test error"); // ❌ Auto handled by asyncHandler
  })
);
```

✅ **`express-async-handler` automatically `next(error)` call kar dega.**

---

## **🎯 Summary**

| Function                | Purpose                                                                      |
| ----------------------- | ---------------------------------------------------------------------------- |
| `next()`                | Control next middleware function ko de deta hai                              |
| `next(error)`           | Error-handling middleware ko activate karta hai                              |
| `express-async-handler` | Automatically `next(error)` call karta hai agar async function me error aaye |

**💡 Best Practice:**  
✔️ Hamesha middleware functions me **ya toh `next()` call karein ya response send karein.**  
✔️ Error handling ke liye **`next(error)` use karein ya `express-async-handler` ka use karein.**
