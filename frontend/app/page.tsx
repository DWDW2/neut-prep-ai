import Image from "next/image";

export default function Home() {
  const tableHtml = "<table border=\"1\"><tr><th>Percentage distribution of estimated salt intake (g/day)</th><th>Men</th><th>Women</th></tr><tr><td>3 g or less</td><td>1%</td><td>3%</td></tr><tr><td>6 g or less</td><td>11%</td><td>30%</td></tr><tr><td>9 g or less</td><td>44%</td><td>73%</td></tr><tr><td>12 g or less</td><td>68%</td><td>93%</td></tr><tr><td>15 g or less</td><td>92%</td><td>99%</td></tr><tr><td>18 g or less</td><td>96%</td><td>100%</td></tr></table>"
  return (
    <div>
      <h1>My Table</h1>
      <div dangerouslySetInnerHTML={{ __html: tableHtml }} className=""/>
    </div>
  );
}
