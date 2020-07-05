// Initializations
const checklist = {
  elevator: false,
  laundry: false,
  'washer/dryer in-unit': false,
  cat: false,
  pet: false,
  'pets allowed': false,
  'no pets': false,
};

function datasets() {
  let description = '';
  let amenities = '';
  let highlights = '';

  try {
    description = document
      .getElementsByClassName('Description-block')[0]
      .children[0].innerText.toLowerCase();

    amenities = Array.from(
      document.getElementsByClassName('AmenitiesBlock-item')
    )
      .map(function(amenity) {
        return amenity.innerText;
      })
      .join(',')
      .toLowerCase();

    highlights = Array.from(
      document.getElementsByClassName('AmenitiesBlock-highlights')[0].children
    )
      .map(function(highlight) {
        return highlight.children[1].children[0].innerText;
      })
      .join(',')
      .toLowerCase();
  } catch (error) {
    console.error(error);
  }

  return [description, amenities, highlights];
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
  checklist.elevator &&
  (checklist.laundry || checklist['washer/dryer in-unit']) &&
  (checklist.cat || checklist.pet || checklist['pets allowed'])
) {
  document.body.style.border = '2em solid lightgreen';
} else {
  document.body.style.border = '2em solid red';
}
