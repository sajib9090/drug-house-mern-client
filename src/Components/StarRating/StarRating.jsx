const StarRating = ({ value, size }) => {
  const integerPart = Math.floor(value);
  const decimalPart = parseFloat((value - integerPart).toFixed(1));
  let empty = Math.floor(5 - decimalPart - integerPart);

  const customSize = {
    height: size + "px",
  };

  const starImages = [];

  for (let i = 0; i < integerPart; i++) {
    starImages.push(
      <img
        key={`star-${i}`}
        style={customSize}
        src="https://raw.githubusercontent.com/sajib9090/stars-resource/main/star100%25png.png"
        alt="Star"
      />
    );
  }

  if (decimalPart === 0.1) {
    starImages.push(
      <img
        key="decimal"
        style={customSize}
        src="https://raw.githubusercontent.com/sajib9090/stars-resource/main/star10%25png.png"
        alt="Star"
      />
    );
  } else if (decimalPart === 0.2) {
    starImages.push(
      <img
        key="decimal"
        style={customSize}
        src="https://raw.githubusercontent.com/sajib9090/stars-resource/main/star20%25png.png"
        alt="Star"
      />
    );
  } else if (decimalPart === 0.3) {
    starImages.push(
      <img
        key="decimal"
        style={customSize}
        src="https://raw.githubusercontent.com/sajib9090/stars-resource/main/star30%25png.png"
        alt="Star"
      />
    );
  } else if (decimalPart === 0.4) {
    starImages.push(
      <img
        key="decimal"
        style={customSize}
        src="https://raw.githubusercontent.com/sajib9090/stars-resource/main/star40%25png.png"
        alt="Star"
      />
    );
  } else if (decimalPart === 0.5) {
    starImages.push(
      <img
        key="decimal"
        style={customSize}
        src="https://raw.githubusercontent.com/sajib9090/stars-resource/main/star50%25png.png"
        alt="Star"
      />
    );
  } else if (decimalPart === 0.6) {
    starImages.push(
      <img
        key="decimal"
        style={customSize}
        src="https://raw.githubusercontent.com/sajib9090/stars-resource/main/star60%25png.png"
        alt="Star"
      />
    );
  } else if (decimalPart === 0.7) {
    starImages.push(
      <img
        key="decimal"
        style={customSize}
        src="https://raw.githubusercontent.com/sajib9090/stars-resource/main/star70%25png.png"
        alt="Star"
      />
    );
  } else if (decimalPart === 0.8) {
    starImages.push(
      <img
        key="decimal"
        style={customSize}
        src="https://raw.githubusercontent.com/sajib9090/stars-resource/main/star80%25png.png"
        alt="Star"
      />
    );
  } else if (decimalPart === 0.9) {
    starImages.push(
      <img
        key="decimal"
        style={customSize}
        src="https://raw.githubusercontent.com/sajib9090/stars-resource/main/star90%25png.png"
        alt="Star"
      />
    );
  }

  for (let i = 0; i < empty; i++) {
    starImages.push(
      <img
        key={`empty-${i}`}
        style={customSize}
        src="https://raw.githubusercontent.com/sajib9090/stars-resource/main/star0%25png.png"
        alt="Empty Star"
      />
    );
  }

  return <div className="flex flex-row">{starImages}</div>;
};

export default StarRating;
