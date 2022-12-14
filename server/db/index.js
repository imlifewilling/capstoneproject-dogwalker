const conn = require('./conn');
const User = require('./User');
const Dog = require('./Dog');
const Service = require('./Service');
const ServiceEvent = require('./ServiceEvent');
const Review = require('./Review');
const fs = require('fs');
const path = require('path');
const { faker } = require ('@faker-js/faker');

//set the relatioship between models
Dog.belongsTo(User);
User.hasMany(Dog);
Service.belongsTo(User);
User.hasMany(Service);
ServiceEvent.belongsTo(Service);
Service.hasMany(ServiceEvent);
ServiceEvent.belongsTo(Dog);
Dog.hasMany(ServiceEvent);
Review.belongsTo(User);
User.hasMany(Review);
Review.belongsTo(ServiceEvent);
ServiceEvent.hasMany(Review);

const getImage = (path)=> {
  return new Promise((resolve, reject)=> {
    fs.readFile(path, 'base64', (err, data)=> {
      if(err) {
        reject(err);
      }
      else {
        resolve(data);
      }
    });
  });
};

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const kendalAvatar = await getImage(path.join(__dirname, '../../static/images/kendal.jpg'));
  const lucaAvatar = await getImage(path.join(__dirname, '../../static/images/luca.jpg'));
  const janeAvatar = await getImage(path.join(__dirname, '../../static/images/jane.jpeg'));
  const hanAvatar = await getImage(path.join(__dirname, '../../static/images/han.jpg'));
  const maxAvatar = await getImage(path.join(__dirname, '../../static/images/max.jpg'));
  const cocoAvatar = await getImage(path.join(__dirname, '../../static/images/coco.jpg'));
  const benbenAvatar = await getImage(path.join(__dirname, '../../static/images/benben.jpg'));
  const chunkAvatar = await getImage(path.join(__dirname, '../../static/images/chunk.jpg'));
  const mochaAvatar = await getImage(path.join(__dirname, '../../static/images/mocha.jpg'));
  const barkleyAvatar = await getImage(path.join(__dirname, '../../static/images/barkley.jpg'));



  let walker = []
  for(let i = 0; i < 30; i++) {
      walker.push( await User.create({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        password: '123',
        email: faker.internet.email(),
        latlng: faker.address.nearbyGPSCoordinate([35.073920, -106.546940], 100, true),
        phone: faker.phone.number(),
        userDescription: 'I have 10 years of experience',
        avatar: faker.internet.avatar(),
        isWalker: true
    })
    )
  }

  let service = []
  for(let i = 0; i < 10; i++) {
    service.push( await Service.create({
        task: ['Dog Walking'],
        serviceDescription: 'walk your dog in your neighborhood',
        availability: ['Morning'],
        serviceDogsize: 'Small',
        price: 20,
        userId: walker[i].id
      })
    )
  }
  for(let i = 10; i < 20; i++) {
    service.push( await Service.create({
        task: ['House Sitting'],
        serviceDescription: 'take care of your dogs at home',
        availability: ['Afternoon'],
        serviceDogsize: 'Large',
        price: 15,
        userId: walker[i].id
      })
    )
  }
  for(let i = 20; i < 30; i++) {
    service.push( await Service.create({
        task: ['Dog Day Care'],
        serviceDescription: 'take care of your dog the whole day',
        availability: ['Any Time'],
        serviceDogsize: 'Any Size',
        price: 12,
        userId: walker[i].id
      })
    )
  }


  const userslist = [
    {
      firstname: 'Max',
      lastname: 'Li',
      password: '123',
      email: 'lmx4wo@gmail.com',
      address: '724 Central Ave SE, Albuquerque, NM, US, 87102',
      phone: '505-243-4688',
      userDescription: 'My dog is adorable and easy to work with!',
      avatar: maxAvatar,
      isWalker: false
    },
    {
      firstname: 'Luca',
      lastname: 'Liu',
      password: '123',
      email: 'luca@gmail.com',
      address: '9001 Central Ave NE, Albuquerque, NM, US, 87123',
      phone: '505-293-3953',
      userDescription: 'Cute and adorable puppy in need of a caring walker!',
      avatar: lucaAvatar,
      isWalker: false
    },
    {
      firstname: 'Han',
      lastname: 'Lu',
      password: '123',
      email: 'han@gmail.com',
      address: '3401 Ladera Dr NW, Albuquerque, NM, US, 87120',
      phone: '505-836-4449',
      userDescription: 'Two dogs means double trouble. Looking for experienced walkers.',
      avatar: hanAvatar,
      isWalker: false
    },
    {
      firstname: 'Kendal',
      lastname: 'Enz',
      password: '123',
      email: 'kendal@gmail.com',
      address: '5200 Eubank Blvd NE, Albuquerque, NM, US, 87111',
      phone: '505-296-8195',
      userDescription: 'My pomeranian is a lot heavier than you would think!',
      avatar: kendalAvatar,
      isWalker: false
    },
    {
      firstname: 'Jane',
      lastname: 'Zheng',
      password: '123',
      email: 'jane@gmail.com',
      address: '1100 2nd St SW, Albuquerque, NM, US, 87102',
      phone: '505-296-8295',
      userDescription: 'I have 10 years of experience',
      avatar: janeAvatar,
      isWalker: true
    },
    {
      firstname: 'Cody',
      lastname: 'Cotlet',
      password: '123',
      email: 'cody@gmail.com',
      address: '806 Central Ave SE, Albuquerque, NM 87102',
      phone: '505-296-8295',
      userDescription: 'I have 5 years of experience',
      avatar: '',
      isWalker: true
    },
    {
      firstname: 'Alex',
      lastname: 'Cohen',
      password: '123',
      email: 'alex@gmail.com',
      address: '6703 Academy Rd NE, Albuquerque, NM, US, 87102',
      phone: '505-750-3305',
      userDescription: 'I have only 1 year of experience, but I am very patient',
      avatar: '',
      isWalker: true
    }
  ];

  const [max, luca, han, kendal, jane, cody, alex] = await Promise.all(
    userslist.map(
      user => User.create(user)
    )
  );

  const [benben, chunk, mocha, barkley, coco] = await Promise.all(
    [
      Dog.create({
        nickname: 'Benben',
        age_year: 2,
        age_month: 6,
        gender: 'male',
        weight: '15',
        breed: 'Bulldog',
        dogDescription: 'Benben is an active boy',
        avatar: benbenAvatar,
        userId: max.id
      }),
      Dog.create({
        nickname: 'Chunk',
        age_year: 1,
        age_month: 3,
        gender: 'male',
        weight: '40',
        breed: 'Rottweiler',
        dogDescription: 'Chunk is huge but nice',
        avatar: chunkAvatar,
        userId: luca.id
      }),
      Dog.create({
        nickname: 'Mocha',
        age_year: 3,
        age_month: 1,
        gender: 'female',
        weight: '100',
        breed: 'Bulldog',
        dogDescription: 'Mocha likes to play with all kinds of balls',
        avatar: mochaAvatar,
        userId: han.id
      }),
      Dog.create({
        nickname: 'Barkley',
        age_year: 2,
        age_month: 8,
        gender: 'male',
        weight: '40',
        breed: 'Husky',
        dogDescription: 'Barkley is always full of energy',
        avatar: barkleyAvatar,
        userId: han.id
      }),
      Dog.create({
        nickname: 'Coco',
        age_year: 1,
        age_month: 7,
        gender: 'female',
        weight: '4120',
        breed: 'Pomeranian',
        dogDescription: 'coco likes to take pictures',
        avatar: cocoAvatar,
        userId: kendal.id
      })
    ]
  );

  const [service1, service2, service3, service4, service5, service6] = await Promise.all(
    [
      Service.create({
        task: ['Dog Walking'],
        serviceDescription: 'walk your dog in your neighborhood',
        availability: ['Morning'],
        serviceDogsize: 'Small',
        price: 20,
        userId: jane.id
      }),
      Service.create({
        task: ['Dog Walking','House Sitting'],
        serviceDescription: 'walk your dog in your neighborhood',
        availability: ['Morning'],
        serviceDogsize: 'Giant',
        price: 20,
        userId: cody.id
      }),
      Service.create({
        task: ['House Sitting'],
        serviceDescription: 'take care of your dogs at home',
        availability: ['Afternoon'],
        serviceDogsize: 'Large',
        price: 15,
        userId: cody.id
      }),
      Service.create({
        task: ['Dog Walking'],
        serviceDescription: 'walk your dog in your neighborhood',
        availability: ['Morning', 'Afternoon'],
        serviceDogsize: 'Medium',
        price: 20,
        userId: alex.id
      }),
      Service.create({
        task: ['House Sitting'],
        serviceDescription: 'take care of your dogs at home',
        availability: ['Afternoon'],
        serviceDogsize: 'Small',
        price: 15,
        userId: alex.id
      }),
      Service.create({
        task: ['Dog Day Care'],
        serviceDescription: 'take care of your dog the whole day',
        availability: ['Any Time'],
        serviceDogsize: 'Any Size',
        price: 12,
        userId: alex.id
      })
    ]
  );

  const [serviceevent1, serviceevent2, serviceevent3, serviceevent4, serviceevent5] = await Promise.all(
    [
      ServiceEvent.create({
        startHour: 10,
        startMinute: 0,
        duration: 2,
        isCompleted: true,
        serviceId: service1.id,
        dogId: benben.id
      }),
      ServiceEvent.create({
        startHour: 9,
        startMinute: 0,
        duration: 2,
        isCompleted: false,
        serviceId: service1.id,
        dogId: chunk.id
      }),
      ServiceEvent.create({
        startHour: 14,
        startMinute: 0,
        duration: 2,
        isCompleted: true,
        serviceId: service3.id,
        dogId: coco.id
      }),
      ServiceEvent.create({
        startHour: 8,
        startMinute: 0,
        duration: 8,
        isCompleted: true,
        serviceId: service6.id,
        dogId: mocha.id
      }),
      ServiceEvent.create({
        startHour: 8,
        startMinute: 0,
        duration: 8,
        isCompleted: true,
        serviceId: service6.id,
        dogId: barkley.id
      })
    ]
  );

  const [review1, review2, review3, review4, review5, review6, review7] = await Promise.all(
    [
      Review.create({
        star:  5,
        comment: 'good and very patient',
        userId: max.id,
        serviceeventId: serviceevent1.id,
        walkerId: jane.id
      }),
      Review.create({
        star:  4,
        comment: 'keep everything clean',
        userId:  kendal.id,
        serviceeventId: serviceevent3.id,
        walkerId: cody.id

      }),
      Review.create({
        star:  4,
        comment: 'take care mocha in detail',
        userId:  han.id,
        // serviceeventId: serviceevent4.id,
        walkerId: alex.id
      }),
      // Review.create({
      //   star:  4,
      //   comment: 'take care barkley in detail',
      //   userId:  han.id,
      //   serviceeventId: serviceevent5.id
      // })
      ,
      Review.create({
        star:  4,
        comment: 'both max and benben are nice',
        userId:  jane.id,
        serviceeventId: serviceevent1.id,
        walkerId: jane.id
      }),
      Review.create({
        star:  4,
        comment: 'mocha is so active',
        userId:  alex.id,
        serviceeventId: serviceevent4.id,
        walkerId: alex.id

      }),
      // Review.create({
      //   star:  4,
      //   comment: 'barkley is very quite',
      //   userId:  alex.id,
      //   serviceeventId: serviceevent5.id
      // })
    ]
  )
};


module.exports = {
  syncAndSeed,
  User,
  Dog,
  Service,
  ServiceEvent,
  Review
};
