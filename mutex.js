const counterClosure = function () {
  let isLocked = false;
  let counterValue = 0;

  function updateCounterValue(selectedBox) {
    selectedBox.innerHTML = counterValue;
  }

  function increaseCounter(selectedBox) {
    if (isLocked) {
      return;
    }
    counterValue += 1;
    updateCounterValue(selectedBox);
  }

  function decreaseCounter(selectedBox) {
    if (isLocked) {
      return;
    }
    counterValue -= 1;
    updateCounterValue(selectedBox);
  }

  function resetCounter(selectedBox) {
    if (isLocked) {
      return;
    }
    counterValue = 0;
    updateCounterValue(selectedBox);
  }

  function toggleLock(selectedBox) {
    isLocked = !isLocked;
    selectedBox.style.color = isLocked ? 'red' : 'black';
  }

  return {
    increase(selectedBox) {
      increaseCounter(selectedBox);
    },
    decrease(selectedBox) {
      decreaseCounter(selectedBox);
    },
    reset(selectedBox) {
      resetCounter(selectedBox);
    },
    toggle(selectedBox) {
      toggleLock(selectedBox);
      document.getElementById(`toggle-${selectedBox.id}`).innerHTML = isLocked
        ? 'Unlock'
        : 'Lock';
    },
  };
};

// Closures for each counter.
const counterOneClosure = counterClosure();
const counterTwoClosure = counterClosure();
const counterThreeClosure = counterClosure();

// Adding an event listener and assigning a callback on Button Click.
function assignEvent(selectedElement, callback, callbackParams) {
  selectedElement.addEventListener('click', function () {
    callback(...callbackParams);
  });
}

const boxOne = document.getElementById('counter-one');
const boxTwo = document.getElementById('counter-two');
const boxThree = document.getElementById('counter-three');

const counterModifierButtons = document.querySelectorAll('button');

for (counterButton of counterModifierButtons) {
  const counterAction = counterButton.id.split('-')[0];
  const requiredClosure = counterButton.id.split('-').slice(-1)[0];

  switch (requiredClosure) {
    case 'one':
      assignEvent(counterButton, counterOneClosure[counterAction], [boxOne]);
      break;
    case 'two':
      assignEvent(counterButton, counterTwoClosure[counterAction], [boxTwo]);
      break;
    case 'three':
      assignEvent(counterButton, counterThreeClosure[counterAction], [
        boxThree,
      ]);
      break;
  }
}
