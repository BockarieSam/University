import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Usage: node server/scripts/hash-password.js "your-new-password"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("\nAdd this to server/.env:\n");
console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
