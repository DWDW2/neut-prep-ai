const TaskTypes = [
    {
        "question": "Which one of the following, if true, would most weaken the above statement?",
        "statement": "A two-month study of major producers of ivory products showed that worldwide demand for elephant tusks for ivory had fallen sharply. Therefore, it is safe to assume that there will be a general decline in elephant poaching.",
        "variants": {
            "A": "There are far fewer elephants than there were ten years ago, so poachers are finding it increasingly difficult to make a living from the ivory trade.",
            "B": "Poachers now use high-powered rifles that make it easier for them to kill larger numbers of elephants than was possible in the past.",
            "C": "The worldwide demand for ivory fluctuates considerably at certain times of the year, so poachers store up ivory to sell when the market improves.",
            "D": "More and more synthetic materials are being used as substitutes for ivory in the construction of such things as piano keys and billiard balls.",
            "E": "The worldwide demand for ivory has been falling consistently for the last twenty years, and many ivory poachers have found alternative sources of income."
        },
        "right_answer": {
            "C": "The worldwide demand for ivory fluctuates considerably at certain times of the year, so poachers store up ivory to sell when the market improves."
        }
    },
    {
        "question": "Which one of the following best identifies the flaw in the above reasoning?",
        "statement": "Alcohol is largely to blame for a rise in the incidence of breast cancer. Research from St. George’s Hospital shows the number of women with breast cancer rose significantly over a ten-year period. Researchers also found the average amount of alcohol women drank rose by more than 40% over the same period. The study used figures from a number of regional hospitals and compared drinking habits between 1997 and 2007.",
        "variants": {
            "A": "",
            "B": "It confuses actual amounts drunk by some women with average consumption.",
            "C": "It makes a sweeping generalisation on the strength of a very local sample.",
            "D": "It assumes that all serious illnesses are related to lifestyle.",
            "E": "It fails to specify the amount by which breast cancer has increased."
        },
        "right_answer": {
            "B": "It confuses actual amounts drunk by some women with average consumption."
        }
    },
    {
        "question": "Which one of the following is an expression of the main conclusion of the above statement?",
        "statement": "If people go to a foreign country, they should try to learn at least some of the language of that country because, while it is difficult to pick up a foreign language in a short time, learning just a little of a foreign language helps you to find out more about the country itself and its people’s customs. As well as this, it means that you can do things much more easily, such as asking for directions or just being able to order what you want at a restaurant, which is much less embarrassing than pointing and arm-waving.",
        "variants": {
            "A": "It is easier to do things in a country if you have learnt the language of that country.",
            "B": "You will find out more about a country if you learn the language of that country.",
            "C": "It is difficult to learn a foreign language in a short time.",
            "D": "When people visit a foreign country they should try to learn some of the language.",
            "E": "Speaking a foreign language is easier than having to use sign language."
        },
        "right_answer": {
            "D": "When people visit a foreign country they should try to learn some of the language."
        }
    },
    {
        "question": "Which one of the following is the best statement of the flaw in the above statement?",
        "statement": "The government blames schools and teachers for boys underperforming. However, science tells a different story. Evolutionary biology shows that females have evolved to have better verbal and emotional skills than males because of the need in prehistoric times for women to take the lead in bringing up children. By contrast, the need for males in prehistoric times to hunt in packs for food has made males more prone to violence and also skilled at calculating and planning. Neurologists have added to this insight by showing that the male hormone testosterone has an adverse impact on language skills. So clearly differences in educational performance between boys and girls cannot be explained in terms of failing teachers.",
        "variants": {
            "A": "It assumes that scientific explanations apply to the average male or female, ignoring exceptions.",
            "B": "It assumes that biological differences come in degrees and are not absolute.",
            "C": "It assumes that skills in calculating and planning have a role in educational performance.",
            "D": "It assumes that the differences in performance between the sexes are due solely to biological differences.",
            "E": "It assumes that teachers are not trying to improve the performance of failing boys."
        },
        "right_answer": {
            "D": "It assumes that the differences in performance between the sexes are due solely to biological differences."
        }
    },
    {
        "question": "Which one of the following is a conclusion that can reliably be drawn from the above passage?",
        "statement": "Scientists are now developing genetically modified crop plants that produce their own pesticide. But pesticides are only effective if they are not overused; if they are applied continuously for long periods, then the pests that they are supposed to kill develop resistance to them. Pesticides only remain effective against pests, therefore, if periods are left during which they are not used. The genetically modified crop plants will produce pesticides continuously.",
        "variants": {
            "A": "The pesticides produced by the genetically modified crop plants become ineffective against pests.",
            "B": "The genetic modification of crop plants will make the crops unusable, as they will be contaminated with pesticide.",
            "C": "The genetically modified crop plants will help to prevent the overuse of pesticides.",
            "D": "The development of genetically modified crop plants will enable more effective use of pesticides, since periods may be left when they are not used.",
            "E": "The development of genetically modified crop plants will mean that pesticides need no longer be sprayed onto fields."
        },
        "right_answer": {
            "A": "The pesticides produced by the genetically modified crop plants become ineffective against pests."
        }
    },
    {
        "question": "Which one of the following is an underlying assumption of the above statement?",
        "statement": "Many people in modern society suffer from depression. This can be treated with drugs, such as Prozac, that alter the chemical balance of the brain. However, the individual can undergo psychotherapy, which involves talking through problems with a sympathetic and skilled fellow human being with a view to putting the subject in a more positive frame of mind. Depressed individuals who do not like the idea of their brain chemistry being altered should therefore choose psychotherapy.",
        "variants": {
            "A": "Psychotherapy is more effective than drugs in treating depression.",
            "B": "Alternative medicine is preferable to conventional medicine.",
            "C": "Psychotherapy cannot be combined with drug treatments.",
            "D": "Depression is caused by the pace of modern life.",
            "E": "Psychotherapy does not alter the individual’s brain chemistry."
        },
        "right_answer": {
            "E": "Psychotherapy does not alter the individual’s brain chemistry."
        }
    },
    {
        "question": "Which one of the following best identifies the flaw in the above reasoning?",
        "statement": "Alcohol is largely to blame for a rise in the incidence of breast cancer. Research from St. George’s Hospital shows the number of women with breast cancer rose significantly over a ten-year period. Researchers also found the average amount of alcohol women drank rose by more than 40% over the same period. The study used figures from a number of regional hospitals and compared drinking habits between 1997 and 2007.",
        "variants": {
            "A": "It confuses actual amounts drunk by some women with average consumption.",
            "B": "It makes a sweeping generalisation on the strength of a very local sample.",
            "C": "It assumes that all serious illnesses are related to lifestyle.",
            "D": "It fails to specify the amount by which breast cancer has increased.",
            "E": "It gives a causal explanation when only a correlation has been found."
        },
        "right_answer": {
            "E": "It gives a causal explanation when only a correlation has been found."
        }
    },
    {
        "question": "Which one of the following is a conclusion that can be drawn from the above passage?",
        "statement": "A dishonest act, such as stealing money from a handbag or cheating in school, may arise for one of many different reasons. But the reasons may be consistent with the personality of the individual involved. One child may steal, for example, in order to show off; another to get money to support a hobby or to get a birthday present for a younger sister; another to express aggression or hatred against the person from whom he or she steals. One child may cheat in order to avoid punishment for academic failure; another because of personal ambition; another to express contempt for the system.",
        "variants": {
            "A": "It is wrong to assume that a child who is dishonest in one kind of situation will be dishonest in others.",
            "B": "A child who cheats does so for very complex reasons.",
            "C": "A child whose motive is generosity towards someone else should not be blamed for stealing.",
            "D": "Underlying all dishonest acts is hostility towards others.",
            "E": "Children who are not exhibitionist or aggressive or acquisitive are unlikely to steal money."
        },
        "right_answer": {
            "B": "A child who cheats does so for very complex reasons."
        }
    },
    {
        "question": "Sue and Ben are buying some kitchen goods at a shop that is having a sale. The terms of the sale are as follows: Total marked price of purchases (before discount) Reduction (%) Up to €50 25 Up to €100 33 €100 or more 50 The marked prices of the goods they have chosen come to €96. How much less would they actually spend, to the nearest €1, if they chose extra goods to the value of €6?",
        "table": "<table border=\"1\"><tr><th>Total marked price of purchases (before discount)</th><th>Reduction (%)</th></tr><tr><td>Up to €50</td><td>25</td></tr><tr><td>Up to €100</td><td>33</td></tr><tr><td>€100 or more</td><td>50</td></tr></table>",
        "variants": {
            "A": "€2",
            "B": "€6",
            "C": "€10",
            "D": "€13",
            "E": "€16"
        },
        "right_answer": {
            "A": "€2"
        }
    },
    {
        "question": "Which country’s percentage growth per year remained consistently greater than half of its period 1 level throughout the following periods?",
        "table": "<table border=\"1\"><tr><th>Country</th><th>Period 1</th><th>Period 2</th><th>Period 3</th></tr><tr><td>Japan</td><td>8.5</td><td>3.0</td><td>3.2</td></tr><tr><td>France</td><td>5.4</td><td>3.0</td><td>2.6</td></tr><tr><td>United Kingdom</td><td>3.6</td><td>1.5</td><td>2.4</td></tr><tr><td>Belgium</td><td>3.3</td><td>2.8</td><td>2.3</td></tr><tr><td>Sweden</td><td>4.1</td><td>1.5</td><td>1.8</td></tr><tr><td>Denmark</td><td>4.3</td><td>2.6</td><td>1.7</td></tr><tr><td>Italy</td><td>6.3</td><td>3.0</td><td>1.6</td></tr><tr><td>Netherlands</td><td>4.8</td><td>2.7</td><td>1.6</td></tr><tr><td>Germany</td><td>4.5</td><td>3.1</td><td>1.6</td></tr><tr><td>United States</td><td>2.2</td><td>0.0</td><td>0.8</td></tr></table>",
        "variants": {
            "A": "France",
            "B": "United Kingdom",
            "C": "Germany",
            "D": "Denmark",
            "E": "Belgium"
        },
        "right_answer": {
            "D": "Denmark"
        }
    },
    {
        "statement": "The effect of shortening degree courses at universities from three years to two would be that students would have two-thirds as much time to think about their subject. The result would be graduates whose understanding of their subject was shallower and whose intellectual development was much less extended. Any measure that leads to a lowering of the quality of graduates should be resisted by universities.",
        "question": "Which one of the following conclusions can reliably be drawn from the above passage?",
        "variants": {
            "A": "University graduates at present have an in-depth understanding of their subject.",
            "B": "Universities should oppose the shortening of degree courses to two years.",
            "C": "Universities are not proposing to reduce the length of degree courses to two years.",
            "D": "Students should oppose moves by universities to shorten degree courses.",
            "E": "Universities should adopt more rigorous standards for the award of degrees"
        },
        "right_answer": {
            "B": "Universities should oppose the shortening of degree courses to two years."
        }
    },
    {
        "statement": "It is not always clear whether a doctor should tell the truth to a patient or not. On the one hand, patients have a right to know what is the matter with them and what the future holds, so that they can make their own informed decisions, however upsetting the truth may be. It is a simple issue of human rights. But on the other hand, a patient’s health may sometimes be better served by not knowing a frightening truth. For instance, a doctor may believe that a patient’s medical condition will actually worsen if they realise how serious it is. Therefore, there are cases in which doctors have no choice: they must decide in favour of not telling the patient the truth.",
        "question": "Which one of the following is an underlying assumption of the above statement?",
        "variants": {
            "A": "Patients accept that a doctor has a responsibility to decide what will be in their best interests.",
            "B": "Doctors have a duty to conceal the truth if they believe it will frighten the patient.",
            "C": "Doctors have a duty to tell their patients the truth even when the truth would upset them.",
            "D": "Doctors have a greater responsibility for a patient’s well-being than for their right to know the truth.",
            "E": "It is the responsibility of doctors to respect a patient’s human rights whatever their medical condition."
        },
        "right_answer": {
            "D": "Doctors have a greater responsibility for a patient’s well-being than for their right to know the truth."
        }
    },
    {
        "statement": "Zoos are entirely unsuitable places for animals. People visit zoos to learn about animal behaviour, but the animals they see are likely to be behaving in abnormal and neurotic ways because of the crowded and unnatural conditions in which they are kept. Zoos should be closed down and the money saved should be reallocated to the protection of natural habitats.",
        "question": "Which one of the following, if true, would most weaken the above statement?",
        "variants": {
            "A": "Humans living in crowded conditions can also become neurotic.",
            "B": "Schoolchildren can learn a great deal about animals from visiting zoos",
            "C": "Many of the animals currently in zoos would not be capable of living in the wild.",
            "D": "The protection of wildlife habitats is very costly.",
            "E": "Zoos enable endangered species to survive by breeding them in captivity and then re-introducing them to the wild."
        },
        "right_answer": {
            "E": "Zoos enable endangered species to survive by breeding them in captivity and then re-introducing them to the wild."
        }
    },
    {
        "statement": "A boy is given €1,00 by his grandparents to buy sweets. He decides to spend at least half his money on liquorice sticks at 5c each, at least a quarter of his money on toffees at 3c each and at least one tenth of his money on pieces of bubble gum at 2c each. He will decide how to spend the rest of the money when he gets to the shop.",
        "question": "What is the possible range of number of pieces of bubble gum he can buy?",
        "variants": {
            "A": "from 5 to 9.",
            "B": "from 5 to 11.",
            "C": "from 5 to 13.",
            "D": "from 6 to 12.",
            "E": "from 10 to 22."
        },
        "right_answer": {
            "D": "from 6 to 12."
        }
    },
    {
        "question": "In which car park should I leave my car in order to pay as little as possible in parking fees?",
        "table": "<table border=\"1\"><tr><th>Car Park</th><th>Charge Details</th></tr><tr><td>Grove Street</td><td>€6.00 per day, flat rate</td></tr><tr><td>Victoria Square</td><td>€1.00 per hour or part of an hour</td></tr><tr><td>Central Park</td><td>Free for 2 hours, then €2.00 per hour or part of an hour</td></tr><tr><td>Bonningtons</td><td>Free for 1 hour, then €1.50 per hour or part of an hour</td></tr><tr><td>Grange Road</td><td>€2.50 for 3 hours, then €1.50 per hour or part of an hour</td></tr></table>",
        "variants": {
            "A": "Grove Street",
            "B": "Victoria Square",
            "C": "Central Park",
            "D": "Bonningtons",
            "E": "Grange Road"
        },
        "right_answer": {
            "B": "Victoria Square"
        }
    },
    {
        "statement": "Observations of the brains of adult human subjects before and after periods of intense memory recall (for instance, preparing for the exams taken by London taxi drivers testing their knowledge of London) have shown surprising results. When comparisons were made between brain scans taken at the start of their preparations and at the end, it was found that the parts of the brain responsible for memory had actually increased in size. This would seem to suggest that, just like a muscle, the brain increases in size and power the more it is used. People who want to improve their overall IQ (Intelligence Quotient) should therefore simply take a very large number of IQ tests.",
        "question": "Which one of the following is the best expression of the flaw in the above argument?",
        "variants": {
            "A": "London taxi drivers are not necessarily representative of the population as a whole.",
            "B": "It assumes that there is a single part of the brain that is responsible for one’s IQ.",
            "C": "It draws a general conclusion about intelligence from the particular example of memory.",
            "D": "It does not state how many IQ tests constitute a very large number.",
            "E": "Brain size is not necessarily dependent on the extent of mental activity undertaken."
        },
        "right_answer": {
            "C": "It draws a general conclusion about intelligence from the particular example of memory."
        }
    },
    {
        "statement": "Amrik cannot afford to buy the Advanced version of the software. The Professional version is even more expensive, so Amrik cannot afford that either.",
        "question": "Which one of the following most closely parallels the reasoning used in the above argument?",
        "variants": {
            "A": "Amrik does not like foods containing garlic. This pizza contains garlic and anchovies, so Amrik won’t like it either.",
            "B": "It is too far for Amrik to walk to the garden centre. The shops are closer, so he will go there instead.",
            "C": "Amrik cannot sleep at night if he drinks a cup of tea after 9pm, because tea contains caffeine. Coffee contains more caffeine than tea, so Amrik won’t drink that after 9pm either.",
            "D": "Amrik didn't have enough patience to complete the 1000-piece jigsaw he got for his birthday. Solving the crossword also requires patience, so he won’t complete that either.",
            "E": "Amrik’s hair is shorter, and Callum’s hair is longer, than Bill’s. So Amrik’s hair is shorter than Callum’s."
        },
        "right_answer": {
            "C": "Amrik cannot sleep at night if he drinks a cup of tea after 9pm, because tea contains caffeine. Coffee contains more caffeine than tea, so Amrik won’t drink that after 9pm either."
        }
    },
    {
        "statement": "Buttons that are on the right-hand side of clothes are easier to fasten and unfasten for a right-handed person than for a left-handed person. Buttons are on the right-hand side of clothes for men, but on the left side for women. This arose because buttons used to be very expensive and were only worn by women who were rich enough to have a servant who helped them to dress. But almost everyone buttons their own clothes now, so manufacturers of women’s clothes should now place the buttons on the right-hand side.",
        "question": "Which one of the following identifies the principle underlying the above argument?",
        "variants": {
            "A": "No one needs a servant in order to dress.",
            "B": "Wealth should not determine fashions in clothing.",
            "C": "Cost effectiveness should determine clothing design.",
            "D": "It is a good thing to break with tradition.",
            "E": "The needs of the majority should come first."
        },
        "right_answer": {
            "E": "The needs of the majority should come first."
        }
    },
    {
        "statement": "An employee has to write three letters intended for three different people. The employee is in a bad mood with the manager who makes this request and decides that each of the recipients of the letters will receive one written to someone else.",
        "question": "How many different ways are there to send the letters in order to achieve this?",
        "variants": {
            "A": "1",
            "B": "2",
            "C": "3",
            "D": "5",
            "E": "6"
        },
        "right_answer": {
            "D": "5"
        }
    },
    {
        "question": "Assuming equal numbers of men and women in the population, what percentage of all people consumed above the recommended level of 6 g per day? (Give your answer to the nearest 1%.)",
        "table": "<table border=\"1\"><tr><th>Percentage distribution of estimated salt intake (g/day)</th><th>Men</th><th>Women</th></tr><tr><td>3 g or less</td><td>1%</td><td>3%</td></tr><tr><td>6 g or less</td><td>11%</td><td>30%</td></tr><tr><td>9 g or less</td><td>44%</td><td>73%</td></tr><tr><td>12 g or less</td><td>68%</td><td>93%</td></tr><tr><td>15 g or less</td><td>92%</td><td>99%</td></tr><tr><td>18 g or less</td><td>96%</td><td>100%</td></tr></table>",
        "variants": {
            "A": "20 %",
            "B": "59 %",
            "C": "70 %",
            "D": "80 %",
            "E": "89 %"
        },
        "right_answer": {
            "B": "59 %"
        }
    },
    {
        "statement": "The demand for blood donors is increasing all over the world. In Western countries, in particular, demand has been rising so rapidly that shortages have begun to occur. In all such countries, demand is growing much faster than rates of growth in populations aged 18 to 65 from whom donors are drawn. And, despite a massive research effort to find alternatives, it remains true that in medicine there is no substitute for human blood.",
        "question": "Which one of the following conclusions can be drawn from the above passage?",
        "variants": {
            "A": "As the demand for blood has increased, so the supply has fallen.",
            "B": "The rate of growth of the blood-donor population has been slowing recently.",
            "C": "The increase in the rate of demand for blood is mainly due to population growth.",
            "D": "If more blood donors could be found, there would be no need to find a substitute for human blood.",
            "E": "The problem of the increase in demand for blood shows no sign of disappearing."
        },
        "right_answer": {
            "E": "The problem of the increase in demand for blood shows no sign of disappearing."
        }
    },
    {
        "statement": "Everyone is exposed to low background levels of asbestos and other mineral fibres in the environment, without any evident risk to health. There is absolutely no reason to be concerned about it. Exposure to asbestos fibres in homes and other buildings where asbestos is present and in good condition is not normally significantly different from the background exposure.",
        "question": "Which one of the following is a conclusion that can be drawn from the above passage?",
        "variants": {
            "A": "Asbestos is harmless whether you encounter it in the home or in the environment.",
            "B": "There is a serious risk to health if asbestos found in the home is in bad condition.",
            "C": "The dangers of using asbestos as a building material have been greatly exaggerated.",
            "D": "There is normally no reason to be concerned about asbestos in the home, if it is in good condition.",
            "E": "Removing asbestos from a building where it has been used is much more of a health hazard than leaving it in place."
        },
        "right_answer": {
            "D": "There is normally no reason to be concerned about asbestos in the home, if it is in good condition."
        }
    },
    {
        "statement": "Young smokers’ perceptions of parents’ attitudes to their smoking",
        "table": "<table border=\"1\"><tr><th>Parents’ actual attitude to their children smoking</th><th>Don’t mind</th><th>Rather they didn’t</th><th>Don't like it</th><th>Don’t know that they smoke</th></tr><tr><td>Young people’s perception</td><td>56%</td><td>22%</td><td>19%</td><td>3%</td></tr><tr><td>Parents’ actual attitude</td><td>13%</td><td>15%</td><td>63%</td><td>9%</td></tr></table>",
        "question": "Which one of the following conclusions is best supported by the data given above?",
        "variants": {
            "A": "Young people are likely to be more tolerant of smoking than their parents.",
            "B": "Young people tend to underestimate their parents’ disapproval of their smoking.",
            "C": "Smoking in a young person can lead to a deterioration in relations with their parents.",
            "D": "Parents are unlikely to express strong disapproval of their children’s habits."
        },
        "right_answer": {
            "B": "Young people tend to underestimate their parents’ disapproval of their smoking."
        }
    },
    {
        "question": "In a particular year, the month of January (which has 31 days) contains five Fridays. Which one of the following could NOT be true?",
        "variants": {
            "A": "The first Friday in the month occurs before the 4th of January.",
            "B": "The 1st of January is a Wednesday.",
            "C": "There are only four Tuesdays.",
            "D": "There are also five Sundays.",
            "E": "The 31st of January is a Monday."
        },
        "right_answer": {
            "E": "The 31st of January is a Monday."
        }
    }                                    
]


const getCriticalPromt = [
    {text: `You are the best NUET exam preparation assistant. 
            Your main goal is to generate hardest tasks for exam preparation. 
            When generating you need to rely on this types of task: ${TaskTypes}.
            You need to generate 30 json format task based on this types of task: ${TaskTypes}.
            Randomly use these 30 types of task to generate 30 json format task.
            You need to generate only json format data, other types of data are premitted. 
    `},
];

export default getCriticalPromt;