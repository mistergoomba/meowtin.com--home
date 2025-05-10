// Animation timing configuration
// All values are in scroll percentage (0-1)

export const timing = {
    // Background transitions
    background: {
      gradientFadeStart: 0,
      gradientFadeEnd: 0.3,
      gridAppearStart: 0.15, // Start showing grid earlier
      gridAppearEnd: 0.25, // Complete grid transition earlier
    },
  
    // Intro section
    intro: {
      fadeInStart: 0,
      fadeInEnd: 0.05,
      fadeOutStart: 0.05,
      fadeOutEnd: 0.25,
      // End intro timing (when it reappears at the end)
      endFadeInStart: 0.99, // Start fading in the intro at the end
      endFadeInEnd: 1, // Fully visible at the very end
    },
  
    // Bio section
    bio: {
      fadeInStart: 0.0005,
      fadeInEnd: 0.15,
      fadeOutStart: 0.12,
      fadeOutEnd: 0.17,
  
      // Sequential animations within bio
      imageAnimStart: 0,
      imageAnimEnd: 0.1,
      headingAnimStart: 0.1,
      headingAnimEnd: 0.4,
      textAnimStart: 0.3,
      textAnimEnd: 0.6,
    },
  
    // Word cloud section
    wordCloud: {
      fadeInStart: 0.15, // Start fading in when bio is fading out
      fadeInEnd: 0.16, // Fully visible shortly after
      fadeOutStart: 0.35, // Start fading out
      fadeOutEnd: 0.4, // Completely gone
  
      // Word animations
      wordsAnimStart: 0.2, // Start word animations slightly after section begins to appear
      wordsAnimEnd: 0.26, // Complete word animations before section starts to fade
      wordsFadeOutStart: 0.3,
      wordsFadeOutEnd: 0.35,
    },
  
    // Projects section
    projects: {
      startAt: 0.35, // Projects start after word cloud
  
      // For each project
      title: {
        fillStart: 0,
        fillEnd: 0.6, // Fill completes earlier to allow time for falling animation
        unfillStart: 0.9, // Start the falling animation later
        unfillEnd: 1.2, // Complete the title exit
      },
  
      screenshot: {
        growStart: 0,
        growEnd: 0.4,
        holdUntil: 1.2, // Hold the screenshot at full size until this point
        shrinkEnd: 1.4, // Complete shrinking by this point
  
        // Cursor
        cursorAppear: 0.6, // When cursor starts to appear
        cursorFadeIn: 0.65, // When cursor is fully visible
        cursorMidPoint: 0.9, // Middle point of cursor movement
        cursorEndPoint: 1.1, // When cursor reaches final position
        cursorFadeOut: 1.2, // When cursor starts to fade out (same as holdUntil)
      },
  
      description: {
        animStart: 0,
        animEnd: 0.3,
      },
    },
  }
  