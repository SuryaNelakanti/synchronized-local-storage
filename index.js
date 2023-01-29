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

const closuresObj = {
  one: counterOneClosure,
  two: counterTwoClosure,
  three: counterThreeClosure,
};

// Adding an event listener and assigning a callback on Button Click.
function assignEvent(selectedElement, callback, callbackParams) {
  selectedElement.addEventListener('click', function () {
    callback(...callbackParams);
  });
}

const counterModifierButtons = document.querySelectorAll('button');

for (counterButton of counterModifierButtons) {
  const counterAction = counterButton.id.split('-')[0];
  const requiredClosureNumber = counterButton.id.split('-').slice(-1)[0];
  const requiredCounter = document.getElementById(
    'counter-' + requiredClosureNumber
  );

  assignEvent(
    counterButton,
    closuresObj[requiredClosureNumber][counterAction],
    [requiredCounter]
  );
}
