document.addEventListener('DOMContentLoaded', () => {
    // Counter
    let count = 0;
    let counter = document.getElementById('counter');
  
    // Timer
    let timer = setInterval(() => {
      if (count >= 0) {
        count++;
        counter.innerText = count;
      }
    }, 1000);
  
    // Buttons
    let minusBtn = document.getElementById('minus');
    let plusBtn = document.getElementById('plus');
    let heartBtn = document.getElementById('heart');
    let pauseBtn = document.getElementById('pause');
    let restartBtn = document.getElementById('restart');
    let likes = {};
  
    minusBtn.addEventListener('click', () => {
      count--;
      counter.innerText = count;
    });
  
    plusBtn.addEventListener('click', () => {
      count++;
      counter.innerText = count;
    });
  
    heartBtn.addEventListener('click', () => {
      if (!likes[count]) {
        likes[count] = 1;
      } else {
        likes[count]++;
      }
      let likeCount = document.getElementById(`like-count-${count}`);
      if (!likeCount) {
        likeCount = document.createElement('li');
        likeCount.id = `like-count-${count}`;
        document.querySelector('.likes').appendChild(likeCount);
      }
      likeCount.innerText = `${count} has been liked ${likes[count]} times`;
    });
  
    let isPaused = false;
    let pause = () => {
      clearInterval(timer);
      minusBtn.disabled = true;
      plusBtn.disabled = true;
      heartBtn.disabled = true;
      pauseBtn.innerText = 'Resume';
      isPaused = true;
    };
  
    let resume = () => {
      timer = setInterval(() => {
        if (count >= 0) {
          count++;
          counter.innerText = count;
        }
      }, 1000);
      minusBtn.disabled = false;
      plusBtn.disabled = false;
      heartBtn.disabled = false;
      pauseBtn.innerText = 'Pause';
      isPaused = false;
    };
  
    pauseBtn.addEventListener('click', () => {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    });
  
    restartBtn.addEventListener('click', () => {
      count = 0;
      counter.innerText = count;
      likes = {};
      document.querySelector('.likes').innerHTML = '';
      resume();
    });
  
    // Comments
    let comments = [];
    let commentForm = document.getElementById('comment-form');
    let commentList = document.getElementById('comment-list');
  
    commentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let commentInput = document.getElementById('comment-input');
      let comment = commentInput.value.trim();
      if (comment !== '') {
        comments.push(comment);
        commentInput.value = '';
        displayComments();
      }
    });
  
    let displayComments = () => {
      commentList.innerHTML = '';
      comments.forEach((comment) => {
        let li = document.createElement('li');
        li.innerText = comment;
        commentList.appendChild(li);
      });
    };
  
    // Initial display of comments
    displayComments();
  });

  