import { Track } from "./types"
import { client } from "./utils/axiosSetup"

/**
 * Function that will grab all the tracks available on the service
 * @returns A list containing each track with its id, name, and category
 */
export const getTrackData = async (): Promise<Track[] | undefined> => {
  const trackData: Track[] = []
  const seen: Set<string> = new Set()
  try {
    const URL = "https://members-ng.iracing.com/data/track/get"
    const { link } = (await client.get<{ link: string }>(URL)).data

    const response: Track[] = (await client.get<Track[]>(link)).data
    for (const track of response) {
      const {
        ai_enabled,
        allow_pitlane_collisions,
        allow_rolling_start,
        allow_standing_start,
        award_exempt,
        category,
        category_id,
        closes,
        config_name,
        corners_per_lap,
        created,
        first_sale,
        free_with_subscription,
        fully_lit,
        grid_stalls,
        has_opt_path,
        has_short_parade_lap,
        has_start_zone,
        has_svg_map,
        is_dirt,
        is_oval,
        is_ps_purchasable,
        lap_scoring,
        latitude,
        location,
        longitude,
        max_cars,
        night_lighting,
        nominal_lap_time,
        number_pitstalls,
        opens,
        package_id,
        pit_road_speed_limit,
        price,
        price_display,
        priority,
        purchasable,
        qualify_laps,
        rain_enabled,
        restart_on_left,
        retired,
        search_filters,
        site_url,
        sku,
        solo_laps,
        start_on_left,
        supports_grip_compound,
        tech_track,
        time_zone,
        track_config_length,
        track_dirpath,
        track_id,
        track_name,
        track_types,
      } = track
      if (!seen.has(track_name)) seen.add(track_name)
      trackData.push({
        ai_enabled,
        allow_pitlane_collisions,
        allow_rolling_start,
        allow_standing_start,
        award_exempt,
        category,
        category_id,
        closes,
        config_name,
        corners_per_lap,
        created,
        first_sale,
        free_with_subscription,
        fully_lit,
        grid_stalls,
        has_opt_path,
        has_short_parade_lap,
        has_start_zone,
        has_svg_map,
        is_dirt,
        is_oval,
        is_ps_purchasable,
        lap_scoring,
        latitude,
        location,
        longitude,
        max_cars,
        night_lighting,
        nominal_lap_time,
        number_pitstalls,
        opens,
        package_id,
        pit_road_speed_limit,
        price,
        price_display,
        priority,
        purchasable,
        qualify_laps,
        rain_enabled,
        restart_on_left,
        retired,
        search_filters,
        site_url,
        sku,
        solo_laps,
        start_on_left,
        supports_grip_compound,
        tech_track,
        time_zone,
        track_config_length,
        track_dirpath,
        track_id,
        track_name,
        track_types,
      })
    }

    return trackData
  } catch (error) {
    console.error(error)
    return undefined
  }
}
