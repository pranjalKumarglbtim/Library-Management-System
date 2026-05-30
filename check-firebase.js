#!/usr/bin/env node

/**
 * Firebase Configuration Checker
 * Run this to check if your Firebase config is set up correctly
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔥 Firebase Configuration Checker\n');
console.log('═'.repeat(50));

const configPath = path.join(__dirname, 'src', 'config', 'firebase.ts');

// Check if file exists
if (!fs.existsSync(configPath)) {
  console.log('❌ Error: firebase.ts not found!');
  console.log('   Location should be: src/config/firebase.ts');
  process.exit(1);
}

// Read the file
const content = fs.readFileSync(configPath, 'utf8');

// Check for demo values
const checks = [
  {
    name: 'API Key',
    pattern: /apiKey:\s*["']AIzaSyDemo_/,
    isDemo: true,
    message: 'Still using demo API key'
  },
  {
    name: 'Auth Domain',
    pattern: /authDomain:\s*["']library-demo/,
    isDemo: true,
    message: 'Still using demo auth domain'
  },
  {
    name: 'Project ID',
    pattern: /projectId:\s*["']library-demo/,
    isDemo: true,
    message: 'Still using demo project ID'
  }
];

let hasDemo = false;
let hasReal = false;

console.log('\n📋 Checking configuration...\n');

checks.forEach(check => {
  if (check.pattern.test(content)) {
    console.log(`⚠️  ${check.name}: ${check.message}`);
    hasDemo = true;
  } else {
    console.log(`✅ ${check.name}: Configured`);
    hasReal = true;
  }
});

console.log('\n' + '═'.repeat(50));

if (hasDemo && !hasReal) {
  console.log('\n❌ FIREBASE NOT CONFIGURED\n');
  console.log('Your Firebase config is still using demo values.');
  console.log('\n📖 TO FIX THIS:\n');
  console.log('1. Go to https://console.firebase.google.com/');
  console.log('2. Create a new project');
  console.log('3. Enable Authentication (Email/Password)');
  console.log('4. Get your config from Project Settings');
  console.log('5. Update src/config/firebase.ts with your real config');
  console.log('\n📚 See FIREBASE_SETUP_GUIDE.md for detailed steps');
  console.log('\n');
} else if (hasDemo && hasReal) {
  console.log('\n⚠️  PARTIAL CONFIGURATION\n');
  console.log('Some values are configured, but some demo values remain.');
  console.log('Make sure to replace ALL demo values with your real Firebase config.');
  console.log('\n');
} else {
  console.log('\n✅ FIREBASE CONFIGURED!\n');
  console.log('Your Firebase configuration looks good!');
  console.log('\n🚀 Next steps:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Try signing up with a test account');
  console.log('   3. Check Firebase Console to see your new user');
  console.log('\n');
}

console.log('═'.repeat(50));
console.log('\n💡 TIP: Keep your Firebase API key safe!');
console.log('   While it\'s OK to expose it in frontend apps,');
console.log('   make sure to set up proper security rules.\n');
