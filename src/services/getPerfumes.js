export default async function getPerfumes(perfumesArray) {
  const convertedPerfumes = [];
  try {
    const response = await fetch(
      "https://vn-parfemi-default-rtdb.firebaseio.com/.json"
    );

    if (response.ok) {
      const responseData = await response.json();

      Object.values(responseData).forEach((brand) => {
        Object.entries(brand).forEach(([key, perfume]) => {
          const perfumeWithId = Array.isArray(perfume)
            ? { ...perfume[0], id: key }
            : { ...perfume, id: key };
          convertedPerfumes.push(perfumeWithId);
        });
      });
      perfumesArray.value = [...convertedPerfumes];
    }
  } catch (error) {
    console.error("New error", error);
  }
  return perfumesArray;
}
