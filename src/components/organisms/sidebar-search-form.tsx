import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../molecules/sidebar";
import SearchPage from "./search-form";

export default function SidebarSearchForm() {
    return (
        <Sidebar icon={faSearch} title="検索">
          <SearchPage />
        </Sidebar>
    );
}
