import { Title, Container, Table, Anchor, Badge, ScrollArea, Divider, Text, Box } from "@mantine/core";
import * as _ from 'lodash';
import grapesRaw from "./grapes.json";
import { useRouter } from 'next/router';
import Navigation from '../components/Navigation';
import { useMediaQuery } from '@mantine/hooks';

type GrapeRaw = {
  order: number,
  name: string,
  climate: string,
  acidity: string;
  tannins: string;
  sweetness: string;
  body: string;
  flavour: string;
  oak: string;
  additional_characteristics: string;
  aging: string;
  country: string;
  region: string;
  characteristics: string;
}

type Climate = "Cool" | "Moderate" | "Warm";
type Acidity = "Low" | "Medium" | "High";
type Tannins = "Low" | "Medium" | "High";
type Sweetness = "Dry" | "Off-dry" | "Medium" | "Sweet";
type WineBody = "Light" | "Medium" | "Full";

type GrapeWithRegion = {
  order: number,
  name: string,
  climate: Climate[],
  acidity: Acidity[],
  tannins: Tannins[],
  sweetness: Sweetness[],
  body: WineBody[],
  flavour: string[],
  oak: string,
  aging: string[],
  additionalCharacteristics: string[],
  country: string,
  region: string,
  regionalCharacteristics: string,
  locationCharacteristics: string,
}

export default function IndexPage() {
  const grapes: GrapeWithRegion[] = grapesRaw.map((grapeRaw) => {
    const grape: GrapeWithRegion = {
      name: grapeRaw.name.split("/").join(" / "),
      order: grapeRaw.order,
      climate: grapeRaw.climate.split(',').map((c) => c.trim()).filter(c => c.length != 0) as Climate[],
      acidity: grapeRaw.acidity.split(',').map((c) => c.trim()).filter(c => c.length != 0) as Acidity[],
      tannins: grapeRaw.tannins.split(',').map((c) => c.trim()).filter(c => c.length != 0) as Tannins[],
      sweetness: grapeRaw.sweetness.split(',').map((c) => c.trim()).filter(c => c.length != 0) as Sweetness[],
      body: grapeRaw.body.split(',').map((c) => c.trim()).filter(c => c.length != 0) as WineBody[],
      flavour: grapeRaw.flavour.split(";").filter(c => c.length != 0),
      oak: grapeRaw.oak,
      additionalCharacteristics: grapeRaw.additional_characteristics.split(";").filter(c => c.length != 0),
      aging: grapeRaw.aging.split(";").filter(c => c.length != 0),
      country: grapeRaw.country || "",
      region: grapeRaw.region || "",
      regionalCharacteristics: grapeRaw.characteristics || "",
      locationCharacteristics: grapeRaw.location_attribute || "",

    };
    return grape;
  });

  const generateClimateBadges = (climates: Climate[]) => {
    const color = (climate: Climate) => {
      switch (climate) {
        case "Cool":
          return "blue";
        case "Moderate":
          return "yellow";
        case "Warm":
          return "red";
      }
    }
    return climates.map((climate) => {
      return (<Badge key={climate} color={color(climate)}>{climate}</Badge>)
    })
  }

  const generateAcidityBadges = (acidity: Acidity[]) => {
    const color = (acidity: Acidity) => {
      switch (acidity) {
        case "Low":
          return "lime";
        case "Medium":
          return "yellow";
        case "High":
          return "red";
      }
    }
    return acidity.map((acidity) => {
      return (<Badge key={acidity} color={color(acidity)}>{acidity}</Badge>)
    })
  }

  const generateTanninsBadges = (tannins: Tannins[]) => {
    const color = (tannins: Tannins) => {
      switch (tannins) {
        case "Low":
          return "lime";
        case "Medium":
          return "yellow";
        case "High":
          return "red";
      }
    }
    return tannins.map((tannins) => {
      return (<Badge key={tannins} color={color(tannins)}>{tannins}</Badge>)
    })
  }

  const generateBodyBadges = (body: WineBody[]) => {
    const color = (body: WineBody) => {
      switch (body) {
        case "Light":
          return "blue";
        case "Medium":
          return "teal";
        case "Full":
          return "red";
      }
    }
    return body.map((body) => {
      return (<Badge key={body} color={color(body)}>{body}</Badge>)
    })
  }

  const generateSweetnessBadges = (sweetness: Sweetness[]) => {
    const color = (sweetness: Sweetness) => {
      switch (sweetness) {
        case "Dry":
          return "blue";
        case "Off-dry":
          return "lime";
        case "Medium":
          return "yellow";
        case "Sweet":
          return "red";
      }
    }
    return sweetness.map((sweetness) => {
      return (<Badge key={sweetness} color={color(sweetness)}>{sweetness}</Badge>)
    })
  }

  const generateGrapeRow = (grape: GrapeWithRegion) => {
    return (<tr key={grape.order}>
      <td><Title order={6}>{grape.name}</Title></td>
      <td><div style={{ display: "flex", flexDirection: "column" }}>{generateClimateBadges(grape.climate)}</div></td>
      <td><div style={{ display: "flex", flexDirection: "column" }}>{generateAcidityBadges(grape.acidity)}</div></td>
      <td><div style={{ display: "flex", flexDirection: "column" }}>{generateTanninsBadges(grape.tannins)}</div></td>
      <td><div style={{ display: "flex", flexDirection: "column" }}>{generateSweetnessBadges(grape.sweetness)}</div></td>
      <td><div style={{ display: "flex", flexDirection: "column" }}>{generateBodyBadges(grape.body)}</div></td>
      <td><ul>{generateFlavourList(grape.flavour)}</ul></td>
      <td>{grape.oak}</td>
      <td><ul>{generateCharacteristicsList(grape.additionalCharacteristics)}</ul></td>
      <td><ul>{generateAgingList(grape.aging)}</ul></td>
    </tr>)
  }

  const generateFlavourList = (flavours: string[]) => {
    return flavours.map((flavour) => {
      return (<li key={flavour}>{flavour}</li>)
    })
  }

  const generateCharacteristicsList = (characteristics: string[]) => {
    return characteristics.map((characteristic) => {
      return (<li key={characteristic}>{characteristic}</li>)
    })
  }

  const generateAgingList = (aging: string[]) => {
    return aging.map((age) => {
      return (<li key={age}>{age}</li>)
    })
  }

  const generateGrapeRegionRow = (grape: GrapeWithRegion, grapesWithRegions: _.Dictionary<GrapeWithRegion[]>) => {
    const subGrapeWithRegions = _.orderBy(grapesWithRegions[grape.name], g => g.country + g.region);
    return subGrapeWithRegions.map((gr, idx) => {
      return (<tr key={gr.order}>
        {idx == 0 ? <td rowSpan={subGrapeWithRegions.length}><Title order={6}>{gr.name}</Title></td> : <></>}
        <td>{gr.country}</td>
        <td>{gr.region}</td>
        <td>{gr.regionalCharacteristics}</td>
        <td>{gr.locationCharacteristics}</td>
      </tr>)
    })
  }

  const generateRegionGrapeRow = (region: GrapeWithRegion, regionsWithGrapes: _.Dictionary<GrapeWithRegion[]>) => {
    const subRegionWithGrapes = _.orderBy(regionsWithGrapes[region.country + region.region], g => g.name);
    return subRegionWithGrapes.map((gr, idx) => {
      return (<tr key={gr.order}>
        {idx == 0 ? <td rowSpan={subRegionWithGrapes.length}>{gr.country}</td> : <></>}
        {idx == 0 ? <td rowSpan={subRegionWithGrapes.length}>{gr.region}</td> : <></>}
        <td><Title order={6}>{gr.name}</Title></td>
        <td>{gr.regionalCharacteristics}</td>
        {/* <td>{gr.locationCharacteristics}</td> */}
      </tr>)
    })
  }

  const uniqueGrapes = _.chain(grapes).uniqBy(g => g.name).orderBy(g => g.order).value();
  const grapesWithRegions = _.chain(grapes).groupBy(g => g.name).value();

  const uniqueRegions = _.chain(grapes).uniqBy(g => g.country + g.region).orderBy(g => g.country + g.region).value();
  const regionsWithGrapes = _.chain(grapes).groupBy(g => g.country + g.region).value();

  const router = useRouter();
  const printable = router.query.printable != undefined;
  const isMobile = useMediaQuery('(max-width: 768px)');

  const content = (
    <Container size={"xl"}>
      <Title order={1} my={15} id="grape-varieties">Grape varieties</Title>
      {!printable &&
        <ScrollArea h={"85vh"} type="always">
          <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true}>
            <thead style={{ position: "sticky", top: 0, background: "white" }}>
              <tr>
                <th>Grape</th>
                <th>Climate</th>
                <th>Acidity</th>
                <th>Tannins</th>
                <th>Sweetness</th>
                <th>Body</th>
                <th>Flavour</th>
                <th>Oak</th>
                <th>Characteristics</th>
                <th>Aging</th>
              </tr>
            </thead>
            <tbody>
              {uniqueGrapes.map((grape) => generateGrapeRow(grape))}
            </tbody>
          </Table>
        </ScrollArea>
      }
      {printable &&
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true}>
          <thead>
            <tr>
              <th>Grape</th>
              <th>Climate</th>
              <th>Acidity</th>
              <th>Tannins</th>
              <th>Sweetness</th>
              <th>Body</th>
              <th>Flavour</th>
              <th>Oak</th>
              <th>Characteristics</th>
              <th>Aging</th>
            </tr>
          </thead>
          <tbody>
            {uniqueGrapes.map((grape) => generateGrapeRow(grape))}
          </tbody>
        </Table>
      }

      <Title order={1} my={15} id="grapes-and-regions">Grapes and regions</Title>
      <Title order={2} my={5} id="grapes-by-grape">By grape</Title>
      {!printable &&
        <ScrollArea h={"85vh"} type="always">
          <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true}>
            <thead style={{ position: "sticky", top: 0, background: "white" }}>
              <tr>
                <th>Grape</th>
                <th>Country</th>
                <th>Region</th>
                <th>Characteristics</th>
                <th>Region Characteristics</th>
              </tr>
            </thead>
            <tbody>
              {uniqueGrapes.map((grape) => generateGrapeRegionRow(grape, grapesWithRegions))}
            </tbody>
          </Table>
        </ScrollArea>
      }
      {printable &&
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true}>
          <thead>
            <tr>
              <th>Grape</th>
              <th>Country</th>
              <th>Region</th>
              <th>Characteristics</th>
              <th>Region Characteristics</th>
            </tr>
          </thead>
          <tbody>
            {uniqueGrapes.map((grape) => generateGrapeRegionRow(grape, grapesWithRegions))}
          </tbody>
        </Table>
      }

      <Title order={2} my={5} id="grapes-by-region">By region</Title>
      {!printable &&
        <ScrollArea h={"85vh"} type="always">
          <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true}>
            <thead style={{ position: "sticky", top: 0, background: "white" }}>
              <tr>
                <th>Country</th>
                <th>Region</th>
                <th>Grape</th>
                <th>Characteristics</th>
                {/* <th>Region Characteristics</th> */}
              </tr>
            </thead>
            <tbody>
              {uniqueRegions.map((region) => generateRegionGrapeRow(region, regionsWithGrapes))}
            </tbody>
          </Table>
        </ScrollArea>
      }
      {printable &&
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true}>
          <thead>
            <tr>
              <th>Country</th>
              <th>Region</th>
              <th>Grape</th>
              <th>Characteristics</th>
              {/* <th>Region Characteristics</th> */}
            </tr>
          </thead>
          <tbody>
            {uniqueRegions.map((region) => generateRegionGrapeRow(region, regionsWithGrapes))}
          </tbody>
        </Table>
      }

      <Title order={1} my={15} id="important-notes">Important Notes</Title>
      <Title order={2} my={5} id="notes-alcohol">Alcohol</Title>
      <ScrollArea type="always">
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"250px"}>
          <tbody>
            <tr>
              <td>Low</td>
              <td>below 11%</td>
            </tr>
            <tr>
              <td>Medium</td>
              <td>11% - 13.9%</td>
            </tr>
            <tr>
              <td>High</td>
              <td>14%+</td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>
      <Title order={4} pt={5}>Fortified wines</Title>
      <ScrollArea type="always">
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"250px"}>
          <tbody>
            <tr>
              <td>Low</td>
              <td>15% - 16.4%</td>
            </tr>
            <tr>
              <td>Medium</td>
              <td>16.5% - 18.4%</td>
            </tr>
            <tr>
              <td>High</td>
              <td>18.5%+</td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>
      <Title order={2} my={5} id="notes-climate">Climate</Title>
      <ScrollArea type="always">
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"300px"}>
          <tbody>
            <tr>
              <td>Cool</td>
              <td>16.5°C (62°F) or below</td>
            </tr>
            <tr>
              <td>Moderate</td>
              <td>16.5°C - 18.5°C (62°F - 65°F)</td>
            </tr>
            <tr>
              <td>Warm</td>
              <td>18.5°C - 21°C (65°F - 70°F)</td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>
      <Title order={2} my={5} id="notes-fermentation">Fermentation</Title>
      <ScrollArea type="always">
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"300px"}>
          <tbody>
            <tr>
              <td>White or rosé wines</td>
              <td>12°C - 22°C (54°F - 72°F)</td>
            </tr>
            <tr>
              <td>Red wines</td>
              <td>20°C - 32°C (68°F - 90°F)</td>
            </tr>
            <tr>
              <td>Rosé wines</td>
              <td>Short maceration then follow by 12°C - 22°C</td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>
      <Title order={2} my={5} id="notes-food-pairing">Food and wine paring</Title>
      <ScrollArea type="always">
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"600px"}>
          <tbody>
            <tr>
              <td>sweet</td>
              <td>more dry and bitter, more acidic, less sweet amd fruity</td>
            </tr>
            <tr>
              <td>umami</td>
              <td>more dry and bitter, more acidic, less sweet amd fruity</td>
            </tr>
            <tr>
              <td>salty</td>
              <td>less dry and bitter, less acidic, more fruity and body</td>
            </tr>
            <tr>
              <td>acidic</td>
              <td>less dry and bitter, less acidic, more sweet and fruity</td>
            </tr>
            <tr>
              <td>highly flavoured</td>
              <td>overwhelmed by the food flavours</td>
            </tr>
            <tr>
              <td>fatty/oily</td>
              <td>less acidic</td>
            </tr>
            <tr>
              <td>Hot(chilli heat)</td>
              <td>alcohol more noticeable</td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>
      <Title order={2} my={5} id="notes-serving-temperatures">Serving temperatures</Title>
      <ScrollArea type="always">
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"600px"}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Temperature</th>
              <th>Style of wine</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Well chilled</td>
              <td>6°C - 8°C (43°F - 46°F)</td>
              <td>Sweet wine</td>
            </tr>
            <tr>
              <td>Well chilled</td>
              <td>6°C - 10°C (43°F - 50°F)</td>
              <td>Sparkling wine</td>
            </tr>
            <tr>
              <td>Chilled</td>
              <td>7°C - 10°C (45°F - 50°F)</td>
              <td>Light-, medium-bodied white or rosé</td>
            </tr>
            <tr>
              <td>Lightly chilled</td>
              <td>10°C - 13°C (50°F - 55°F)</td>
              <td>Full-bodied white</td>
            </tr>
            <tr>
              <td>Room temperature or lightly chilled</td>
              <td>13°C - 18°C (55°F - 64°F)</td>
              <td>Light-bodied red</td>
            </tr>
            <tr>
              <td>Room temperature</td>
              <td>15°C - 18°C (59°F - 64°F)</td>
              <td>Medium-, full-bodied red</td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>

      <Title order={2} my={5} id="notes-sparkling-wine">Sparkling Wine</Title>
      <ScrollArea type="always">
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"600px"}>
          <thead>
            <tr>
              <th></th>
              <th>Champagne</th>
              <th>Cava</th>
              <th>Prosecco</th>
              <th>Asti</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Climate</td>
              <td>Cool</td>
              <td>Warm</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Region</td>
              <td>Champagne region</td>
              <td>Spain, mostly Catalunya</td>
              <td>Veneto/Fruili</td>
              <td>Piedmont</td>
            </tr>
            <tr>
              <td>Aging Duration</td>
              <td>Minimum 12 months</td>
              <td>Minimum 9 months</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Grape</td>
              <td>Chardonnay, Pinot Noir, Pinot Meunier</td>
              <td>Chardonnay, Pinot Noir, local grape</td>
              <td>Glera, Pinot Noir</td>
              <td>Moscato</td>
            </tr>
            <tr>
              <td>Sweetness</td>
              <td>Brut, Demi-sec</td>
              <td></td>
              <td>Dry to sweet</td>
              <td>Sweet</td>
            </tr>
            <tr>
              <td>Alcohol</td>
              <td></td>
              <td></td>
              <td>12%</td>
              <td>5-9%</td>
            </tr>
            <tr>
              <td>Flavour</td>
              <td>Green fruits, citrus, bread, dough, pastry</td>
              <td>Green fruits, citrus, bread</td>
              <td>Green apple, peach, white flower</td>
              <td>Flower, peach</td>
            </tr>
            <tr>
              <td>Characteristic</td>
              <td>Vintage and Non-vintage</td>
              <td></td>
              <td>2 rounds of fermentation</td>
              <td>1 round of fermentation</td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>
      <Title order={2} my={5} id="notes-sparkling-wine-country">Sparking Wine Country</Title>
      <ScrollArea type="always">
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"600px"}>
          <tbody>
            <tr>
              <th>Country</th>
              <th>Type</th>
              <th>Grape Varieties</th>
            </tr>
            <tr>
              <td>France</td>
              <td>Champagne</td>
              <td>Chardonnay, Pinot Noir, Pinot Meunier</td>
            </tr>
            <tr>
              <td>Spain</td>
              <td>Cava</td>
              <td>Chardonnay, Pinot Noir, local grape</td>
            </tr>
            <tr>
              <td>South Africa</td>
              <td>Cap Classique</td>
              <td>Chardonnay, Pinot Noir, Chenin Blanc</td>
            </tr>
            <tr>
              <td>Others</td>
              <td>USA, Australia, New Zealand</td>
              <td>Chardonnay, Pinot Noir, local grape</td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>


      <Title order={2} my={5} id="notes-pdo-pgi">PDO and PGI</Title>
      <ScrollArea type="always">
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"600px"}>
          <tbody>
            <tr>
              <th>Country</th>
              <th>PDO (Protected Designation of Origin)</th>
              <th>PGI (Protected Geographical Indication)</th>
            </tr>
            <tr>
              <td>France</td>
              <td>AOP (Appellation d&apos;Origine Protégée) and AOC (Appellation d&apos;Origine Contrôlée)</td>
              <td>IGP (Indication Géographique Protégée)</td>
            </tr>
            <tr>
              <td>Italy</td>
              <td>DOC (Denominazione di Origine Controllata) and DOCG (Denominazione di Origine Controllata e Garantita)</td>
              <td>IGT (Indicazione Geografica Tipica)</td>
            </tr>
            <tr>
              <td>Spain</td>
              <td>DO (Denominación de Origen) and DOCa (Denominación de Origen Calificada)</td>
              <td>Vino de la Tierra</td>
            </tr>
            <tr>
              <td>Germany</td>
              <td>Qualitätswein and Prädikatswein</td>
              <td>Landwein</td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>

      <Title order={2} my={5} id="notes-labelling-spain">Labelling in Spain</Title>
      <ScrollArea type="always">
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"600px"}>
          <tbody>
            <tr>
            <th>Labeling in Spain</th>
              <th>Joven</th>
              <th>Crianza</th>
              <th>Reserva</th>
              <th>Gran Reserva</th>
            </tr>
            <tr>
              <td>Aging</td>
              <td>No aging</td>
              <td>Short aging</td>
              <td>5 months</td>
              <td>Long aging</td>
            </tr>
            <tr>
              <td>Flavor Profile</td>
              <td>Red fruit</td>
              <td>Vanilla</td>
              <td>Dried fruit</td>
              <td>Mushroom</td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>

      <Title order={2} my={5} id="notes-labelling-germany">Sweetness Labeling in Germany</Title>
      <ScrollArea type="always">
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"600px"}>
          <tbody>
            <tr>
              <th>Prädikat Level</th>
              <th>Description</th>
            </tr>
            <tr>
              <td>Kabinett</td>
              <td></td>
            </tr>
            <tr>
              <td>Spätlese</td>
              <td>Late harvest</td>
            </tr>
            <tr>
              <td>Auslese</td>
              <td>Selected harvest</td>
            </tr>
            <tr>
              <td>Eiswein</td>
              <td>Concentrated by freezing</td>
            </tr>
            <tr>
              <td>Beerenauslese (BA)</td>
              <td>Selected branch or berries</td>
            </tr>
            <tr>
              <td>Trockenbeerenauslese (TBA)</td>
              <td>Selected berries</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Other Labeling</td>
              <td>Description</td>
            </tr>
            <tr>
              <td>Trocken</td>
              <td>Dry wine</td>
            </tr>
            <tr>
              <td>Halbtrocken</td>
              <td>Wine with some sweetness</td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>

      <Title my={15} order={1}>Need printable version?</Title>
      <Text>Try <Anchor href="?printable">this</Anchor> and then use print function in your browser (works best with landscape mode). It is not perfect but that is all I can do for now.</Text>
      <Title my={15} order={1}>Error? Missing information?</Title>
      <Text>You can report any issues <Anchor href="https://github.com/weiweitoo/wset/issues" target="_blank">here</Anchor></Text>
      <Title my={15} order={1}>Acknowledgments</Title>
      <Text>Prepared based on <q>Wines: Looking behind the label</q> and <q>WSET® Level 2 Award in Wines Workbook</q> by WSET. And this is a fork from <Anchor href="https://github.com/luksow/wset" target="_blank"> @luksow</Anchor> and I further validate some data and add in my own note in for WSET Level 2 Exam. </Text>
      <Divider my={20} size={5} variant="dashed" label="Brought to you with ❤️ by Too"/>
    </Container>
  );

  if (printable) {
    return content;
  }

  return (
    <>
      <Navigation />
      <Box
        sx={{
          marginLeft: isMobile ? 0 : '250px',
          minHeight: '100vh',
        }}
      >
        {content}
      </Box>
    </>
  );
}
