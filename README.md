### **`npx prisma migrate dev --name init` Command Explanation** 🚀

#### **📌 Purpose:**

Yeh command **Prisma ORM** ka use karke **database schema ko migrate** karne ke liye hoti hai. Iska **main kaam** hai:

1. **Database Tables Create/Update Karna** Prisma Schema ke mutabiq.
2. **Migrations History Save Karna** (taake future updates track ho sakein).
3. **Local Development Environment Me Changes Apply Karna**.

---

### **🔍 Breakdown of Command**

```sh
npx prisma migrate dev --name init
```

- **`npx prisma`** → **Prisma CLI** ko execute karta hai.
- **`migrate dev`** → **Database migrations apply** karta hai development environment me.
- **`--name init`** → Migration ka naam `"init"` rakhta hai (jo first migration hai).

---

### **🔧 Step-by-Step Use Case** (Example)

#### **1️⃣ Prisma Schema Define Karein (`prisma/schema.prisma`)**

```prisma
model User {
  id        String  @id @default(uuid())
  name      String
  email     String  @unique
  password  String
  role      String  @default("user")
  createdAt DateTime @default(now())
}
```

#### **2️⃣ Run Migration**

```sh
npx prisma migrate dev --name init
```

✅ **Kya Hoga?**

- `prisma/migrations/` folder me ek new migration create hogi.
- PostgreSQL me `User` table **automatically generate** ho jayega.

---

### **⚡️ Important Notes**

1. **Har baar jab schema update karein**, toh naya migration run karna hoga.
   ```sh
   npx prisma migrate dev --name add_inventory_table
   ```
2. **Agar sirf database update karna ho bina migration history ke**, toh ye use karein:
   ```sh
   npx prisma db push
   ```
   🚀 **Fast & Temporary Changes** ke liye.

---

### **📌 Summary**

| Command                                   | Purpose                                                         |
| ----------------------------------------- | --------------------------------------------------------------- |
| `npx prisma migrate dev --name init`      | **First migration** create aur database me schema apply karega. |
| `npx prisma migrate dev --name add_users` | **New migration** create karega jab schema change hoga.         |
| `npx prisma db push`                      | \*\*Migrations ke bina direct                                   |

🔥 Summary (One-Liner for Each)
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
