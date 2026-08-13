import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const base = "http://localhost:3000";
  const results = [];

  function pass(name) {
    results.push(`PASS: ${name}`);
    console.log(`PASS: ${name}`);
  }
  function fail(name, err) {
    results.push(`FAIL: ${name} — ${err}`);
    console.error(`FAIL: ${name} — ${err}`);
  }

  try {
    await page.goto(base + "/daftar/pelamar");
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByPlaceholder("Sesuai CV / identitas").fill("Rina Pelamar");
    await page.getByPlaceholder("nama@email.com").fill("rina@demo.com");
    await page.getByPlaceholder("08xxxxxxxxxx").fill("081298765432");
    const passwordInputs = page.locator('input[type="password"], input[autocomplete="new-password"]');
    // PasswordInput may be type password
    await page.locator('input').nth(3).fill("Password1!");
    await page.locator('input').nth(4).fill("Password1!");
    await page.locator('input[type="checkbox"]').first().check();
    await page.getByRole("button", { name: /verifikasi email/i }).click();
    await page.waitForURL("**/verifikasi-email");
    pass("Pelamar register → verifikasi-email");

    await page.getByPlaceholder("123456").fill("123456");
    await page.getByRole("button", { name: /Verifikasi & lanjut/i }).click();
    await page.waitForURL("**/onboarding/pelamar");
    pass("Verifikasi email → onboarding pelamar");

    await page.getByPlaceholder(/Junior Accountant|Excel/i).fill("Fresh Graduate Accounting");
    await page.getByPlaceholder("Bengkulu").fill("Jakarta");
    await page.getByRole("button", { name: "Lanjut" }).click();
    await page.getByRole("button", { name: "Lanjut" }).waitFor();
    pass("Onboarding step 1 lanjut");

    // logout via clearing and test login
    await page.goto(base + "/masuk");
    await page.evaluate(() => {
      // keep accounts, clear session
      localStorage.removeItem("hireloop_auth_user");
    });
    await page.reload();
    await page.locator("select").selectOption("pelamar");
    await page.getByPlaceholder("nama@email.com").fill("rina@demo.com");
    await page.locator('input[autocomplete="current-password"]').fill("Password1!");
    await page.getByRole("button", { name: "Masuk" }).click();
    await page.waitForURL(/onboarding\/pelamar|dashboard\/pelamar|verifikasi-email/);
    pass(`Login akun terdaftar → ${page.url()}`);

    // lupa sandi
    await page.goto(base + "/lupa-sandi");
    await page.locator("select").selectOption("pelamar");
    await page.getByPlaceholder("nama@email.com").fill("rina@demo.com");
    await page.getByRole("button", { name: /reset sandi/i }).click();
    await page.waitForURL("**/reset-sandi**");
    pass("Lupa sandi → reset-sandi");

    await page.locator('input[autocomplete="new-password"]').nth(0).fill("Password2!!");
    await page.locator('input[autocomplete="new-password"]').nth(1).fill("Password2!!");
    await page.getByRole("button", { name: /Simpan sandi baru/i }).click();
    await page.waitForURL("**/masuk**");
    pass("Reset sandi → masuk");

    await page.locator("select").selectOption("pelamar");
    await page.getByPlaceholder("nama@email.com").fill("rina@demo.com");
    await page.locator('input[autocomplete="current-password"]').fill("Password2!!");
    await page.getByRole("button", { name: "Masuk" }).click();
    await page.waitForURL(/onboarding\/pelamar|dashboard\/pelamar/);
    pass("Login dengan sandi baru");

    await page.goto(base + "/legal/syarat");
    await page.getByRole("heading", { name: "Syarat Layanan" }).waitFor();
    pass("Halaman syarat");

    await page.goto(base + "/legal/privasi");
    await page.getByRole("heading", { name: "Kebijakan Privasi" }).waitFor();
    pass("Halaman privasi");

    // perusahaan full quick path
    await page.evaluate(() => {
      localStorage.removeItem("hireloop_auth_user");
    });
    await page.goto(base + "/daftar/perusahaan");
    await page.getByPlaceholder("Nama lengkap pemilik akun").fill("Sari HR");
    await page.getByPlaceholder("hr@perusahaan.com").fill("sari3@demo.com");
    await page.getByPlaceholder("08xxxxxxxxxx").fill("081234567890");
    await page.locator('input[autocomplete="new-password"]').nth(0).fill("Password1!");
    await page.locator('input[autocomplete="new-password"]').nth(1).fill("Password1!");
    await page.getByPlaceholder("PT Contoh Maju").fill("PT Demo Lengkap");
    await page.locator("select").nth(0).selectOption("Teknologi");
    await page.locator("select").nth(1).selectOption("11–50 karyawan");
    await page.locator('input[type="checkbox"]').check();
    await page.getByRole("button", { name: /verifikasi email/i }).click();
    await page.waitForURL("**/verifikasi-email");
    await page.getByPlaceholder("123456").fill("123456");
    await page.getByRole("button", { name: /Verifikasi & lanjut/i }).click();
    await page.waitForURL("**/onboarding/perusahaan");
    pass("Perusahaan register+verify → onboarding");
  } catch (err) {
    fail("Unhandled", err.message || String(err));
    await page.screenshot({ path: "/tmp/e2e-fail.png", fullPage: true });
  }

  await browser.close();
  const failed = results.some((r) => r.startsWith("FAIL"));
  console.log("\n=== SUMMARY ===");
  results.forEach((r) => console.log(r));
  process.exit(failed ? 1 : 0);
}

main();
