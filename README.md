# The Jazz Improvisation Bot

<b> Author:  </b> Vikram Bala <br>
<b>Email: </b> vikrambala2002@gmail.com <br>
<b>Code Repository: </b> [GitHub Link](https://github.com/vbala29/Jazz-Improv-Bot) <br>

    
<b>Technology:</b> Website was written on the following stack: Express.js, Node.js, MongoDB, AWS Lambda, HTML5/CSS3/JS/Bootstrap5 <br> 
AWS Lambda is used to run the improvisation generation algorithm. The website is hosted on an AWS Lambda EC2 instance. I also used 
the [Sharp11 library](https://github.com/jsrmath/sharp11) for some really useful tools to work with chords, scales, and notes.<br> <br>

<b>Inspiration:</b> I've played jazz on the upright bass and bass guitar for 8 years, and if there's one thing I've come to learn, 
it's that jazz improvisation truly is like speaking a language—the jazz language. Jazz musicians communicate with one another in real time through their improvisation,
and as one comes to learn more about jazz, it becomes even more clear just how much vocabulary exists in the language. While many start out by learning formulaic approaches to improvising
in jazz, via learning scales and music theory to increase their vocabulary, the best jazz improvisation comes through expression of emotion via the jazz language, rather than thinking about solely scales.
I wondered, is it possible for a machine to ever recreate the kind of passion and expression we hear in jazz solos from the greats like Miles Davis, John Coltrane, Oscar Peterson, and others?
This website is my attempt to answer that question. Given access to all the musical scales in the world, and the tools and techniques jazz musicians use, like cho rd substitutions, 
this improvisation bot will attempts to solo over the greatest jazz standards, and your own compositions. And I ask you to determine, whether this machine is able to make language,
or if it is simply a example of how music is only expressed at its best from emotion and passion.

<br><br>

<b>How Does The Bot Work?</b>  

<br><br>

<u>Choosing a scale for each chord</u> <br>
For each chord in the chart the improvisation bot chooses a scale to use to improvise over that chord. 
However, this is not as simple as playing a C major scale over a C major chord. Using the outness and substitutions parameters,
the algorithm determines scales that might not be obvious. Based on the user chosen parameters on the improv bot page,
a [diatonic chord](https://www.jazz-guitar-licks.com/blog/diatonic-chord-substitution.html) substitution</a> has a probability "s" of occurring for each chord in the chart. <br><br>

If a diatonic substitution is determined to occur for a certain chord, the following happens. 1. We generate an array from the [Sharp11] library(https://github.com/jsrmath/sharp11)of the possible scales
that can be played over that chord in order of most to least frequently played (most to least harmonically distant). All of these scales 
contain the chord tones of the chord, so they are thus diatonic. Then, we use a uniform distribution to select one of the scales in the array. 
<br><br>
40% of the time that a diatonic substitution occurs, instead of the method described above, a tritone substitution will be performed instead. 
This means that the original chord is shifted a minor 5th (aka the tritone). The most common scale of the shifted chord is then chosen as the scale to be used. 

<br><br>
Based on user chosen parameters on the improv bot page, an ["out"](https://en.wikipedia.org/wiki/Outside_(jazz)) chord substitution</a> will be performed with probability "o". If an "out" substitution is determined to occur, it will override any diatonic substitution/tritone substitution. 
As of now, only diminished substitutions for dominant chords are implemented for these "out" chord substitutions.
An example of this is that C7 would be replaced with Bbdim7/C#dim7, but nothing would be substituted for a Cminor7 chord, since this
diminished substitution works best with dominant chords.  Future changes will include side stepping, coltrane changes, and polytonality with upper structures of chords. 

<br><br>

<u>Choosing the first note of the improvisation</u> <br> The bot begins by selecting a starting note for the first chord in the chart by using a Gaussian normal distribution over octaves of the piano with mean = 5 and variance = 1.
The minimum octave to be chosen is the 4th piano octave, and the max is the 6th octave. Note that the when the "play chords" option is ticked on the improvisation page, the piano plays chords in the 4th octave, so centering the Normal distribution around octave 5 meant that it is more likely that
the solo starts above the chords, which sounds best. The algorithm then choses a chord tone of the first chord in the chart
that is also in the scale that has been chosen previously. Thus, this chord tone in the chosen octave is returned as the starting note.

<br><br>
<u>Choosing a note duration</u> <br> For each tempo, there is a specific probability associated how likely a beat is to consist of solely a quarter note, 2 eight notes, 3 eight note triplets, or 4 sixteenth notes. Attached is an image to the probabilities at each tempo range.        
The different probabilities were done to ensure that slow tempos did not have a lack of notes played, and that fast tempos still sounded good on the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)  (i.e. sixteenth notes don't sound good at 220 bpm on web audio so I disabled them). ![note_probabilities](https://user-images.githubusercontent.com/56012430/171744639-4d3e3500-469e-443c-b3f1-78dd8c8d8cc1.png)

For each beat in a chord, we first determine what type of note duration will be played over it. Then, for each 
of the notes in that beat (aka 4 notes if we choose sixteenth notes, or 1 note if we choose a quarter note), there is a user
defined probability that the note will be a rest. If the note is a rest, we don't assign anything to it, and it will be silent when the audio visualizer plays the improvisation. 

<br><br>
<u>Choosing a note</u> <br> The generateNote() function takes in the chosen scale, 
the previous note in the improvisation, and the current chord. It also takes in a boolean
indicating if a note has been improvised over the current chord as yet. <br><br>

<i> Jump Case: </i>  A parameter "jumps" which is set to 30% signifies
whether the next note in the improvisation will be allowed to be more than 1 scale tone away from the previous note. This will
be a user defined parameter in a later revision of this website. If a jump is determined to occur, then 
we use the Gaussian Normal distribution with a mean at the previous note's octave, and a variance of 1 to select a new octave.
The newly chosen octave can at most be one octave away from the previous octave to prevent large jumps. 
We then choose a random chord tone from a uniform distribution that is also in the current scale, and return this as the chosen note. 
<br><br>

<i> Non-Jump Case: </i>If a jump is not to happen, we chose a note either 1 above or 1 below (each with 50% probability, mutually exclusive) the previous note in the chosen scale. 
<br><br>


<u>Voice Leading:</u> Voice leading is the process of using linear melodic lines to create transitions
between chords that outline the harmony of the chords. By using scalar motion, and making each improvisation over a chord start on a chord tone, I simulated some amount of voice leading.





