// Initializations
const checklist = {
  'pets allowed': false,
  'no dogs - cats allowed': false,
  pets: false,
  cats: false,
  'no pets': false,
  laundry: false,
  'washer/dryer in-unit': false,
  elevator: false,
};

function datasets() {
  let description = '';
  let highlights = '';
  let amenities = '';

  try {
    description = document
      .getElementsByClassName('Description-block')[0]
      .children[0].innerText.toLowerCase();

    highlights = Array.from(
      document.getElementsByClassName('AmenitiesBlock-highlights')[0].children
    )
      .map(function(highlight) {
        return highlight.children[1].children[0].innerText;
      })
      .join(',')
      .toLowerCase();

    amenities = Array.from(
      document.getElementsByClassName('AmenitiesBlock-item')
    )
      .map(function(amenity) {
        return amenity.innerText;
      })
      .join(',')
      .toLowerCase();
  } catch (error) {
    console.error(error);
  }

  return [description, highlights, amenities];
}

function check(cl, ds) {
  for (let key in cl) {
    if (cl.hasOwnProperty(key)) {
      if (ds.includes(key) && !cl[key]) {
        cl[key] = true;
      }
    }
  }
}

datasets().forEach(function(dataset) {
  if (dataset.length) {
    check(checklist, dataset);
  }
});

if (
  !checklist['no pets'] &&
  (checklist['pets allowed'] ||
    checklist['no dogs - cats allowed'] ||
    checklist.pets ||
    checklist.cats) &&
  (checklist.laundry || checklist['washer/dryer in-unit']) &&
  checklist.elevator
) {
  document.body.style.border = '2em solid lightgreen';
} else {
  document.body.style.border = '2em solid red';
}
