/* GET home page */
module.exports.index = function(req, res) {
    res.render('index', { 
        title: 'Travlr Getaways',
        page: 'home',
        layout: 'layouts/layout'
    });
};

/* GET rooms page */
module.exports.rooms = function(req, res) {
    res.render('rooms', { 
        title: 'Rooms - Travlr Getaways',
        page: 'rooms',
        layout: 'layouts/layout',
        rooms: [
            {
                name: 'First Class Room',
                image: 'first-class.jpg',
                description: 'Cras dui sapien, feugiat vitae tristique ut, lobortis tempor orci. Donec pulvinar sagittis metus ut tristique. Pellentes que habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas idios.',
                rate: '220'
            },
            {
                name: 'Deluxe Room',
                image: 'deluxe.jpg',
                description: 'Sed et augue lorem. In sit amet placerat arcu. Mauris volutpat ipsum ac justo mollis vel vestibulum orci gravida. Vestibulum sit amet porttitor odio. Nulla facilisi. Fusce at pretium felis.',
                rate: '150'
            },
            {
                name: 'Suite Room',
                image: 'suite.jpg',
                description: 'Sed et augue lorem. In sit amet placerat arcu. Mauris volutpat ipsum ac justo mollis vel vestibulum orci gravida. Vestibulum sit amet porttitor odio. Nulla facilisi. Fusce at pretium felis.',
                rate: '180'
            }
        ]
    });
};

/* GET meals page */
module.exports.meals = function(req, res) {
    res.render('meals', { 
        title: 'Meals - Travlr Getaways',
        page: 'meals',
        layout: 'layouts/layout',
        meals: [
            {
                name: 'SeaFood Special',
                image: 'seafoods.jpg',
                special: 'Fried Salmon Special',
                description: 'I\'m a product overview. Here you can write more information about your product. Buyers like to know ...'
            },
            {
                name: 'Sumptuous Desserts',
                image: 'desserts.jpg',
                special: 'Choco Ice Cream Sandwich',
                description: 'I\'m a product overview. Here you can write more information about your product. Buyers like to know ...'
            },
            {
                name: 'Buffet',
                image: 'buffet.jpg',
                special: 'Mixed Buffet',
                description: 'I\'m a product overview. Here you can write more information about your product. Buyers like to know ...'
            }
        ]
    });
};

/* GET news page */
module.exports.news = function(req, res) {
    res.render('news', { 
        title: 'News - Travlr Getaways',
        page: 'news',
        layout: 'layouts/layout',
        latestNews: [
            { title: '2023 Best Beaches Contest Winners' },
            { title: 'Top 10 Diving Spots' },
            { title: 'Fishing ban to be implemented this year' },
            { title: 'Lifeguard saves child from drowning' }
        ],
        vacationTips: [
            { title: 'What to bring on the beach?' },
            { title: 'Planning Fun Activities' },
            { title: 'Diving Checklist' },
            { title: 'First Aid' },
            { title: 'How to Build a Sand Castle?' },
            { title: 'Tanning Tips' }
        ],
        featured: {
            image: 'kayak.jpg',
            title: 'Experience Kayaking!',
            date: 'April 03, 2023',
            author: 'Juan De La Cruz',
            paragraphs: [
                'Sed et augue lorem. In sit amet placerat arcu. Mauris volutpat ipsum ac justo mollis vel vestibulum orci gravida. Vestibulum sit amet porttitor odio. Nulla facilisi. Fusce at pretium felis. Sed consequat libero ut turpis venenatis ut aliquam risus semper. Etiam convallis mi vel risus pretium sodales. Etiam nunc lorem, ullamcorper vitae laoreet id, rutrum et tortor. Vivamus luctus, lacus id egestas facilisis, nunc nunc ultricies lorem, vitae pulvinar nibh urna vel velit.',
                'Cras dui sapien, feugiat vitae tristique ut, lobortis tempor orci. Donec pulvinar sagittis metus ut tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Nulla at nunc sit amet justo cursus imperdiet. Mauris est leo, placerat nec eleifend eu, facilisis id dolor. Donec nisi nibh, elementum vitae imperdiet non, placerat et felis. Maecenas scelerisque odio quis arcu fringilla malesuada. Nulla facilisi. In libero nulla, fermentum ut pretium ac, pharetra et eros.',
                'Phasellus viverra fringilla lacus, malesuada blandit velit iaculis dignissim. Suspendisse rutrum massa mauris. Donec quis tempus elit.Integer magna leo, posuere et dignissim vitae, porttitor at odio. Pellentesque a metus nec magna placerat volutpat.'
            ]
        }
    });
};

/* GET about page */
module.exports.about = function(req, res) {
    res.render('about', { 
        title: 'About - Travlr Getaways',
        page: 'about',
        layout: 'layouts/layout',
        intro: {
            title: 'We Have Free Templates for Everyone',
            paragraphs: [
                'Our website templates are created with inspiration, checked for quality and originality and meticulously sliced and coded. What\'s more, they\'re absolutely free! You can do a lot with them. You can modify them. You can use them to design websites for clients, so long as you agree with the <a href="http://www.freewebsitetemplates.com/about/terms/">Terms of Use</a>. You can even remove all our links if you want to.',
                'We Have More Templates for You. Looking for more templates? Just browse through all our <a href="http://www.freewebsitetemplates.com/">Free Website Templates</a> and find what you\'re looking for. But if you don\'t find any website template you can use, you can try our <a href="http://www.freewebsitetemplates.com/freewebdesign/">Free Web Design</a> service and tell us all about it. Maybe you\'re looking for something different, something special. And we love the challenge of doing something different and something special.'
            ]
        },
        sections: {
            crews: {
                title: 'Our Crews',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a arcu ipsum.'
            },
            amenities: {
                title: 'Amenities',
                description: 'Phasellus porta ultrices lorem vel luctus.Cras sodales nulla vitae eros fermentum consequat. Aenean at purus odio.'
            }
        },
        community: {
            title: 'Be Part of Our Community',
            description: 'If you\'re experiencing issues and concerns about this website template, join the discussion <a href="http://www.freewebsitetemplates.com/forums/">on our forum</a> and meet other people in the community who share the same interests with you.'
        },
        template: {
            title: 'Template details',
            description: 'Design version 14. Code version 4. Website Template details, discussion and updates for this <a href="http://www.freewebsitetemplates.com/discuss/beachresort/">Travlr Getaways Web Template</a>. Website Template design by <a href="http://www.freewebsitetemplates.com/">Free Website Templates</a>. Please feel free to remove some or all the text and links of this page and replace it with your own About content.'
        }
    });
};

/* GET contact page */
module.exports.contact = function(req, res) {
    res.render('contact', { 
        title: 'Contact - Travlr Getaways',
        page: 'contact',
        layout: 'layouts/layout',
        company: {
            name: 'Travlr Getaways',
            address: '123 Lorem Ipsum Cove, Sed Ut City, LI 12345',
            telephone: '1-800-999-9999',
            fax: '1-800-111-1111'
        }
    });
};
