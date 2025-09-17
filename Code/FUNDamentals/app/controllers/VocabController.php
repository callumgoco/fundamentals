<?php

class VocabController extends Controller {
    function show($f3) {
        $f3->set('user', $_SESSION['user']);
        $f3->set('PATH', '/vocab');
        
        $vocabulary = [
            [
                'term' => 'Budget',
                'pronunciation' => 'buhj-it',
                'type' => 'noun',
                'definition' => 'A document that compares your income to your expenses to make sure you\'re not spending more than you have.',
                'simple_example' => 'Making a budget helps you plan how to spend your money each month.',
                'gen_z_example' => 'Like when Taylor Swift budgets her tour expenses to make sure she doesn\'t overspend on stage production - even billionaires need budgets! 💸',
                'gif_url' => 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2NmZHJkdmp3aDlpNWhnMHJycnF2djlleW41OWo4YzQyOHNhOWt2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j7JDp8MO9BZJL7Hqfs/giphy.gif'
            ],
            [
                'term' => 'Income',
                'pronunciation' => 'in-kuhm',
                'type' => 'noun',
                'definition' => 'Money you earn from work or other sources.',
                'simple_example' => 'Your income could be from a job, allowance, or gifts.',
                'gen_z_example' => 'MrBeast\'s income comes from YouTube ad revenue, sponsorships, and his businesses. Multiple income streams = financial security! 🤑',
                'gif_url' => 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3BmZDZjY3hoYmdiZmhsNWNrMzFvdDFhcDNiajhndzk3N25xOHk5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bMycGOQLESDCEnLNUz/giphy.gif'
            ],
            [
                'term' => 'Expense',
                'pronunciation' => 'ik-spens',
                'type' => 'noun',
                'definition' => 'Money you spend on things you need or want.',
                'simple_example' => 'Food, clothes, and entertainment are common expenses.',
                'gen_z_example' => 'Your monthly Spotify subscription, Netflix, and that bubble tea addiction? Those are all expenses adding up! ☕️',
                'gif_url' => 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWZsaTMyNmQwcWl6NHBmdHA4dXp3eWFpYjRzdTg4cDl0eXBvdmkyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AnKNcBIqEp0bVI4fD8/giphy.gif'
            ],
            [
                'term' => 'Savings',
                'pronunciation' => 'sayv-ings',
                'type' => 'noun',
                'definition' => 'Money you keep aside instead of spending it right away.',
                'simple_example' => 'Put some money in savings each month for future goals.',
                'gen_z_example' => 'Saving up for concert tickets to see Olivia Rodrigo or the latest iPhone - that\'s your savings goal in action! 🎵📱',
                'gif_url' => 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3BmZDZjY3hoYmdiZmhsNWNrMzFvdDFhcDNiajhndzk3N25xOHk5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bMycGOQLESDCEnLNUz/giphy.gif'
            ],
            [
                'term' => 'Debt',
                'pronunciation' => 'det',
                'type' => 'noun',
                'definition' => 'Money you owe to someone else that you need to pay back.',
                'simple_example' => 'If you borrow $20 from a friend, that $20 is your debt.',
                'gen_z_example' => 'Student loans for uni are debt - like borrowing money now to invest in your future career! 🎓💰',
                'gif_url' => 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXlyNDZ2OXZha3BuMjE2eXc2NHZ6bTV0djA2ams0cTBjZm54dWRlOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0Px5qPjypc6XOwGjpk/giphy.gif'
            ],
            [
                'term' => 'Interest',
                'pronunciation' => 'in-ter-ist',
                'type' => 'noun',
                'definition' => 'Extra money charged when you borrow, or earned when you save.',
                'simple_example' => 'Banks pay you interest for keeping money in savings accounts.',
                'gen_z_example' => 'Credit card interest is like a subscription fee you never wanted - avoid it by paying your balance in full! 💳',
                'gif_url' => 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3BmZDZjY3hoYmdiZmhsNWNrMzFvdDFhcDNiajhndzk3N25xOHk5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bMycGOQLESDCEnLNUz/giphy.gif'
            ],
            [
                'term' => 'Credit',
                'pronunciation' => 'kred-it',
                'type' => 'noun',
                'definition' => 'The ability to borrow money based on trust that you\'ll pay it back.',
                'simple_example' => 'Credit cards let you buy things now and pay for them later.',
                'gen_z_example' => 'Good credit is like having a high TikTok following - it takes time to build but opens doors to better opportunities! ✨',
                'gif_url' => 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM21hb2pqMWRnZmI5ZGZsbDlyeDRjYjR6cGNrZmwxZmhpNmplc2VnaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FnSgSXRoN858F2xss4/giphy.gif'
            ],
            [
                'term' => 'Investment',
                'pronunciation' => 'in-vest-ment',
                'type' => 'noun',
                'definition' => 'Putting money into something hoping it will grow in value over time.',
                'simple_example' => 'Buying stocks is an investment that might make you more money.',
                'gen_z_example' => 'Buying Pokemon cards hoping they\'ll be worth more later? That\'s an investment (just maybe not the best one)! 🃏📈',
                'gif_url' => 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3BmZDZjY3hoYmdiZmhsNWNrMzFvdDFhcDNiajhndzk3N25xOHk5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bMycGOQLESDCEnLNUz/giphy.gif'
            ],
            [
                'term' => 'Loan',
                'pronunciation' => 'lohn',
                'type' => 'noun',
                'definition' => 'Money borrowed from someone that must be paid back, usually with interest.',
                'simple_example' => 'Car loans help people buy cars by paying over time.',
                'gen_z_example' => 'Getting a loan for a car is like doing a payment plan for that expensive gaming setup - but with paperwork! 🚗🎮',
                'gif_url' => 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3BmZDZjY3hoYmdiZmhsNWNrMzFvdDFhcDNiajhndzk3N25xOHk5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bMycGOQLESDCEnLNUz/giphy.gif'
            ],
            [
                'term' => 'Bank Account',
                'pronunciation' => 'bangk uh-kount',
                'type' => 'noun',
                'definition' => 'A safe place at a bank where you can store your money.',
                'simple_example' => 'You can put money in and take money out of your bank account.',
                'gen_z_example' => 'Your bank account is like cloud storage for your money - accessible anywhere but way more important than your photos! ☁️💰',
                'gif_url' => 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjBjYTl5bDJjZHhqaTg0MnQzbDk3czM4djFlZ244MjFod2NicXIxbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f7MO098FCipmq0eUpV/giphy.gif'
            ],
            [
                'term' => 'ATM',
                'pronunciation' => 'ay-tee-em',
                'type' => 'noun',
                'definition' => 'A machine that lets you get cash from your bank account.',
                'simple_example' => 'Use your bank card at an ATM to withdraw money anytime.',
                'gen_z_example' => 'ATMs are like vending machines for cash - insert card, get money, but hopefully you don\'t get as many fees as snacks cost! 🏧',
                'gif_url' => 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDNnaXUza3JrbzFoeWxxZ2F2YTdzN284Y3FpNGNtc3hnd2hvb25pYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xZGfHArTvh99YI/giphy.gif'
            ],
            [
                'term' => 'Receipt',
                'pronunciation' => 'ri-seet',
                'type' => 'noun',
                'definition' => 'A piece of paper showing what you bought and how much you paid.',
                'simple_example' => 'Keep your receipts to track where your money goes.',
                'gen_z_example' => 'Receipts are like screenshots of your spending - keep them to prove you didn\'t buy 5 iced coffees in one day (even if you did)! 📸☕️',
                'gif_url' => 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3BmZDZjY3hoYmdiZmhsNWNrMzFvdDFhcDNiajhndzk3N25xOHk5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bMycGOQLESDCEnLNUz/giphy.gif'
            ]
        ];
        
        usort($vocabulary, function($a, $b) {
            return strcasecmp($a['term'], $b['term']);
        });
        
        $user = new DB\SQL\Mapper($this->db, 'users');
        $user->load(['username=?', $_SESSION['user']]);
        
        $f3->set('vocabulary', $vocabulary);
        $f3->set('onboarding_completed', $user->onboarding_completed);
        $f3->set('has_seen_tour', $user->has_seen_tour);
        $f3->set('tour_continue_section', $user->tour_continue_section);
        $f3->set('title', 'Money Words - Financial Vocabulary');
        $f3->set('content', 'vocab.html');
        
        echo \Template::instance()->render('layout.html');
    }
}