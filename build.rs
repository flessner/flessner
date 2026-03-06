use std::process::Command;

fn main() {
    println!("cargo:rerun-if-changed=src/");
    println!("cargo:rerun-if-changed=templates/");

    // Ensure static directory exists
    std::fs::create_dir_all("static").expect("Failed to create static directory");

    // Run Tailwind CSS build via npx
    let status = Command::new("npx")
        .args([
            "@tailwindcss/cli",
            "-i",
            "src/styles.css",
            "-o",
            "static/styles.css",
            "--minify",
        ])
        .status()
        .expect(
            "Failed to run tailwindcss CLI. Make sure Node.js is installed and `npm install` has been run.",
        );

    if !status.success() {
        panic!("Tailwind CSS build failed with exit code: {}", status);
    }
}
