import { faker } from '@faker-js/faker';
import fs from 'fs';

// Generate random user data using Faker.js
// const residenceTypes = [0, 1, 2, 3]; // Apartment, Detached House, Townhouse, Bungalow
// const statuses = [0, 1, 2, 3]; // Active, Inactive, Blacklisted, Pending
// const educationLevels = [0, 1, 2, 3]; // High School, B.Sc, M.Sc, PhD
// const employmentStatuses = [0, 1, 2]; // Employed, Unemployed, Self-Employed
// const employmentSectors = [0, 1, 2]; // Private, Public, NGO
// const relationships = [0, 1, 2, 3]; // Parent, Sibling, Friend, Spouse
// const tierRatings = [0, 1, 2, 3];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const users = Array.from({ length: 500 }, (_, i) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const company = faker.company.name();
  const username = faker.internet.username({ firstName, lastName });
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();
  const bvn = faker.number.int({ min: 10000000000, max: 99999999999 });
  const gender = faker.number.int({ min: 0, max: 1 });
  const maritalStatus = faker.number.int({ min: 0, max: 3 });
  const childCount = randomInt(0, 5);
  const residenceType = faker.number.int({ min: 0, max: 3 });
  const startDate = faker.date.between({ from: '2020-01-01', to: '2025-06-01' }).toISOString();
  const status = faker.number.int({ min: 0, max: 3 });

  const educationLevel = faker.number.int({ min: 0, max: 3 });
  const employmentStatus = faker.number.int({ min: 0, max: 2 });
  const employmentSector = faker.number.int({ min: 0, max: 2 });
  const employmentDuration = `${randomInt(1, 10)} year(s)`;
  const companyEmail = faker.internet.email({ firstName, lastName, provider: company.replace(/\s/g, '').toLowerCase() + '.com' });
  const lowestIncome = randomInt(1000, 5000);
  const highestIncome = lowestIncome + randomInt(1000, 5000);
  const loanPaidAmount = randomInt(0, 10000);

  const twitter = `@${username.toLowerCase()}`;
  const facebook = `facebook.com/${username.toLowerCase()}`;
  const instagram = `@${username.toLowerCase()}`;

  const guarantorFirstName = faker.person.firstName();
  const guarantorLastName = faker.person.lastName();
  const guarantorEmail = faker.internet.email({ firstName: guarantorFirstName, lastName: guarantorLastName });
  const relationship = faker.number.int({ min: 0, max: 3 });

  const bankName = faker.company.name() + ' Bank';
  const bankAccount = faker.finance.accountNumber({ length: 10 });
  const tierRating = faker.number.int({ min: 0, max: 3 });

  function generateCustomPhone() {
    const second = faker.helpers.arrayElement(['8', '9']);
    const third = faker.helpers.arrayElement(['0', '1']);
    const rest = faker.number.int({ min: 10000000, max: 99999999 }).toString().padStart(8, '0');
    return `0${second}${third}${rest}`;
  }

  return {
    personalInfo: {
      id: (i + 1).toString(),
      username: username,
      firstName,
      lastName,
      phone: generateCustomPhone(),
      email: email,
      bvn: bvn,
      gender: gender,
      maritalStatus: maritalStatus,
      company: company,
      childCount: childCount,
      residenceType: residenceType,
      startDate: startDate,
      status: status
    },
    career: {
      educationLevel: educationLevel,
      employmentStatus: employmentStatus,
      employmentSector: employmentSector,
      employmentDuration: employmentDuration,
      companyEmail: companyEmail,
      monthlyIncomeRange: {
        lowest: lowestIncome,
        highest: highestIncome,
        currency: "NGN"
      },
      loanPaidAmount: loanPaidAmount
    },
    socials: {
      twitter: twitter,
      facebook: facebook,
      instagram: instagram
    },
    guarantor: {
      firstName: guarantorFirstName,
      lastName: guarantorLastName,
      number: generateCustomPhone(),
      email: guarantorEmail,
      relationship: relationship
    },
    account: {
      bankName: bankName,
      bankAccount: bankAccount,
      tierRating: tierRating
    }
  };
});

fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
console.log('Generated users.json with 500 users!');