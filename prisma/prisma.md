### 🔄 **How to Refresh Prisma Migrations (Reset Database & Reapply Migrations)?**

Agar Prisma migration corrupt ho gayi ho ya tum **fresh database** se start karna chahte ho, toh **migrate reset** use karna best option hai.

---

## **🔥 Option 1: Reset & Reapply Migrations (Safe for Dev)**

📌 Yeh method **development** ke liye best hai. **(❌ Don't use in production)**

```sh
npx prisma migrate reset
```

🔹 **Yeh kya karega?**

1. **Database ko drop karega** (poora data delete ho jayega 🚨).
2. **Latest migrations reapply karega**.
3. **Prisma Studio kholne ka option dega** (agar chaho toh `npx prisma studio` se manually check kar sakte ho).

✅ **Best for:** Jab tum development phase mein ho aur fresh start chahte ho.

---

## **🔥 Option 2: Delete Migrations & Start Fresh**

Agar tum **purani migrations delete** karke **zero se fresh start** karna chahte ho:

### **1️⃣ Migrations Folder Delete Karo**

```sh
rm -rf prisma/migrations
```

Agar Windows use kar rahe ho:

```sh
rd /s /q prisma\migrations
```

### **2️⃣ Fresh Migration Create Karo**

```sh
npx prisma migrate dev --name init
```

### **3️⃣ Prisma Generate Run Karo**

```sh
npx prisma generate
```

✅ **Best for:** Jab schema change ho chuka ho aur tum **fresh start** chahte ho.

---

## **🚀 Extra: Prisma Seed Data (Optional)**

Agar tum **reset ke baad default users ya data** insert karna chahte ho, toh Prisma ka **seed script** bana sakte ho.

_(prisma/seed.js)_

```javascript
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: "hashedpassword",
      role: "admin",
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
```

### **Run the Seed Script**

```sh
node prisma/seed.js
```

✅ **Best for:** Jab tum reset ke baad **default data** chahte ho.

---

## **🔥 Conclusion**

Agar tum **reset + refresh** chahte ho:

```sh
npx prisma migrate reset
```

Agar **purani migrations delete karke fresh start chahte ho**:

```sh
rm -rf prisma/migrations
npx prisma migrate dev --name init
npx prisma generate
```

Agar **seed data insert karna ho**:

```sh
node prisma/seed.js
```

### **🚨 Production Database Issue: Prisma Migrations Fixing**

Agar **production database** mein yeh issues aa rahe hain, toh tum **direct reset nahi kar sakte** (warna saara data delete ho jayega). ✅ **Safely fix karne ke best practices yeh hain:**

---

## **🔥 1. Debug the Issue First (Reset Mat Karo)**

Pehle yeh check karo:

```sh
npx prisma migrate status
```

**Yeh batayega ke:**

- Koi **pending migration** hai?
- Database **aur schema desync** toh nahi ho gaye?

Agar yeh issue de raha hai **(e.g., text = bigint error)**, toh **manual fix** required hoga.

---

## **🔥 2. Safely Apply Pending Migrations**

Agar `migrate status` se pata chalay ke kuch **migrations pending hain**, toh unko safely apply karo:

```sh
npx prisma migrate deploy
```

**Yeh kya karega?**

- Sirf **jo new migrations hain unko apply karega**.
- Koi bhi data delete nahi hoga.

✅ **Best for:** **Production fix bina data loss ke.**

---

## **🔥 3. Fix Data Type Issues Manually**

Agar **text = bigint** type ka error aa raha hai, iska matlab hai ke **schema aur database ke types match nahi kar rahe**.

### **Step 1: Find the Issue**

```sh
npx prisma db pull
```

Isse Prisma **live database schema** ko update karega. Ab dekho **kaha data types different hain**.

### **Step 2: Manually Fix the Schema**

1. `prisma/schema.prisma` file open karo.
2. Jo **field problematic hai**, uska type **PostgreSQL ke type ke sath match karo**.  
   Example:
   ```prisma
   model User {
     id        String  @id @default(uuid()) // Int se UUID convert kiya
     email     String  @unique
     age       Int?    // Ensure correct type (Int instead of String)
   }
   ```

### **Step 3: Generate & Migrate Safely**

```sh
npx prisma generate
npx prisma migrate dev --name fix-datatype
```

Agar production database mein migration **direct apply nahi kar sakte**, toh **manual SQL ALTER query** likho.

✅ **Best for:** **Schema desync aur data type errors fix karna.**

---

## **🔥 4. Manual SQL Fix (Last Resort)**

Agar Prisma fix nahi kar raha, toh direct PostgreSQL query use karo.  
Example:

```sql
ALTER TABLE users ALTER COLUMN id SET DATA TYPE UUID USING id::uuid;
```

Agar **text = bigint** error aa raha hai, toh:

```sql
ALTER TABLE users ALTER COLUMN age TYPE INTEGER USING age::integer;
```

**⚠️ Warning:** Yeh **direct change hai**, isse pehle **backup lo**.

✅ **Best for:** **Agar Prisma migrations break ho gayi ho.**

---

## **🚀 Summary: Safe Fixing in Production**

### ✅ **Step 1: Debug First**

```sh
npx prisma migrate status
```

### ✅ **Step 2: Apply Pending Migrations**

```sh
npx prisma migrate deploy
```

### ✅ **Step 3: Fix Data Types (If Needed)**

```sh
npx prisma db pull
# Schema fix karo, phir
npx prisma generate
npx prisma migrate dev --name fix-datatype
```

### ✅ **Step 4: Manual SQL Fix (Last Option)**

```sql
ALTER TABLE users ALTER COLUMN age TYPE INTEGER USING age::integer;
```
