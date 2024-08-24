## Run Locally
1. Configure the environment variable based on `.env.example` in `.env`
2. For development purpose, both `NEXT_PUBLIC_MAPBOX_TOKEN` and `SECRET_MAPBOX_TOKEN` can use `Default public token` from mapbox
3. `ALLOWED_HOST` is optional for whitelisting API requests, it is only useful for production deployment
4. run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes
### Tools and Services
- NextJs, needed backend as well for securing API token to prevent heavy cost.
- Mapbox service, for rendering map and provide directions api.
- react-map-gl, a react wrapper for mapbox-gl by vis.gl
    - compared with leaflet and openlayers
    - A react wrapper
    - the repo/code is constantly updating
    - documentation with examples
    - supported by Uber, Carto, Unfolded
    - have some experience with deck.gl before which is also built by vis.gl
- Tailwindcss, for css customization
    - easy to configured as it come with NextJS initial template
    - huge community, easy to find guide, examples and documentations

### Logs
1. Researched on what option available for mapping web application based on the listing [here](https://github.com/joewdavies/awesome-frontend-gis?tab=readme-ov-file). Picked up mapbox and react-map-gl in the end.
2. Rendered the map with markers containing the initial location and 1 driver location.
3. Noticed a `#problem` with mapbox token is exposed to public, found the `#solution` to use [URL restriction](https://docs.mapbox.com/help/troubleshooting/how-to-use-mapbox-securely/#access-tokens) to allowed only requests coming from specified URLs.
4. Created a map control panel to configure driver count value.
    - overlay on top of the map rendered with glass effect, so that it blend in well
    - position panel at bottom center so that it is easier to slide or control in mobile view, nearer to finger
    - there is only one variable to manipulate, so I arrange label and slider on the same level
5. Created a slider based on the [example](https://preline.co/docs/range-slider.html#overview) found.
    - thinking of extracting the lengthy classname, but ended up colocating it at the same file for easier editing
    - just did some minor tweak like grouping the `-webkit-*` and `-moz-*`
    - reuse the HTMLInputElement props for min, max and id
    - have a display at the right to indicate the current value
    - make the slider not only for driver count, but generic enough for reusability
6. Added state to track the changes of driver count and trigger to fetch data from `/driver` endpoint for re-rendering of driver markers.
7. Added Popup for driver marker to display extra information.
    - noticed the `#problem` that the popup content blended in too much with the map
    - Popup content is not easily customizable, therefore `src/app/globals.css` is the workaround for it
8. Added feature to show the path from driver to initial location
    - use mapbox direction API service
    - the URL restricted token created on step 3 is not usable, so `SECRET_MAPBOX_TOKEN` is created separately.
    - this token is not exposed to the public
    - `#problem` with no example on implementing path layer, found the `#solution` solve it by reading the [geojson example](https://visgl.github.io/react-map-gl/examples/geojson), [linestring example](https://docs.mapbox.com/mapbox-gl-js/example/zoomto-linestring/)
    - geojson example guide me how to use Source and Layer and linestring example guide me on the geojson data properties needed by linestring layer
    - have a gradient along the path to indicate starting and ending point by referencing this [doc](https://docs.mapbox.com/style-spec/reference/layers/#paint-line-line-gradient)
9. The directions API also return duration for the driver to reach, so I displayed it in the popup as well.
10. Deployed on Vercel https://drivers-map-wkm97s-projects.vercel.app/

### Future improvement
- Configurable pickup point
- Auto select fastest arrive driver
- Dark theme map and control panel
