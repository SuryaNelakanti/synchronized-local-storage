const localStorageHelpers = {
  getItem(item, param) {
    const localStore = JSON.parse(localStorage.getItem(item));
    if (localStore) {
      return localStore[param];
    }
  },
  setItem(item, value, locked) {
    localStorage.setItem(
      item,
      JSON.stringify({
        counterValue: value,
        locked: locked ? locked : false,
      })
    );
  },
  removeItem(item) {
    localStorage.removeItem(item);
  },
};

const localStorageObj = {
  counterValue: 0,
  locked: false,
};

const counterClosure = function (localStore) {
  const counterStore = localStore;

  let isLocked = false;
  if (localStorageHelpers.getItem(localStore, 'locked')) {
    isLocked = localStorageHelpers.getItem(localStore, 'locked');
  }

  let counterValue = 0;

  if (localStorageHelpers.getItem(localStore, 'counterValue')) {
    counterValue = parseInt(
      localStorageHelpers.getItem(localStore, 'counterValue')
    );
  }

  updateCounterValue(requiredClosureElement(localStore));

  function refreshCounterValue(selectedCounter) {
    counterValue = parseInt(
      localStorageHelpers.getItem(localStore, 'counterValue')
    );

    if (localStorageHelpers.getItem(localStore, 'locked') != isLocked) {
      toggleLock(selectedCounter);
    }

    updateCounterValue(selectedCounter);
  }

  function updateCounterValue(selectedCounter) {
    selectedCounter.innerHTML = counterValue;
    localStorageHelpers.setItem(counterStore, counterValue, isLocked);
  }

  function increaseCounter(selectedCounter) {
    if (isLocked) {
      return;
    }

    counterValue += 1;
    updateCounterValue(selectedCounter);
  }

  function decreaseCounter(selectedCounter) {
    if (isLocked) {
      return;
    }

    counterValue -= 1;
    updateCounterValue(selectedCounter);
  }

  function resetCounter(selectedCounter) {
    if (isLocked) {
      return;
    }

    counterValue = 0;
    updateCounterValue(selectedCounter);
  }

  function toggleLock(selectedCounter) {
    isLocked = !isLocked;
    lockStyleChange(selectedCounter);
  }

  function lockStyleChange(selectedCounter) {
    selectedCounter.style.color = isLocked ? 'red' : 'black';

    document.getElementById(`toggle-${selectedCounter.id}`).innerHTML = isLocked
      ? 'Unlock'
      : 'Lock';

    localStorageHelpers.setItem(counterStore, counterValue, isLocked);
  }

  return {
    increase(selectedCounter) {
      increaseCounter(selectedCounter);
    },

    decrease(selectedCounter) {
      decreaseCounter(selectedCounter);
    },

    reset(selectedCounter) {
      resetCounter(selectedCounter);
    },

    refreshValue(selectedCounter) {
      refreshCounterValue(selectedCounter);
    },

    toggle(selectedCounter) {
      toggleLock(selectedCounter);
    },
  };
};

// Closures for each counter.
const closuresObj = {
  one: counterClosure('one'),
  two: counterClosure('two'),
  three: counterClosure('three'),
};

function requiredClosureElement(closureNumber) {
  return document.getElementById('counter-' + closureNumber);
}

const counterModifierButtons = document.querySelectorAll('button');

// Adding an event listener and assigning a callback on Button Click.
for (counterButton of counterModifierButtons) {
  // Get Closure method required.
  const counterAction = counterButton.id.split('-')[0];

  // Get key of ClosureObj.
  const requiredClosureNumber = counterButton.id.split('-').slice(-1)[0];

  // Get counter element Id.
  const requiredCounter = requiredClosureElement(requiredClosureNumber);

  // Adding event listener onClick.
  counterButton.addEventListener('click', function () {
    closuresObj[requiredClosureNumber][counterAction](requiredCounter);
  });
}

window.onstorage = function (evt) {
  const updatedCounterNumber = evt.key;

  closuresObj[updatedCounterNumber].refreshValue(
    requiredClosureElement(updatedCounterNumber)
  );
};
