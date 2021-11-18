import { ChangeEvent, useState, useEffect, SyntheticEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/lab/Autocomplete';
import useStyles from './useStyles';
import { User } from '../../interface/User';
import { useDebounce } from 'use-debounce';
import { searchUsers } from '../../helpers/APICalls/searchUsers';

interface Props {
  search: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>, newInputValue: string) => void;
}
const Search = ({ search, handleChange }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  // limit our call to the api with a debounced value at max of 1 per 0.5 seconds
  const [debouncedSearch] = useDebounce(search, 500);

  const classes = useStyles();

  const saveOptions = (users: User[]) => {
    setOptions(users);
  };

  useEffect(() => {
    let active = true;

    async function searchAndSaveUsers() {
      // send request to backend API to get users limited to 20.
      setLoading(true);
      const response = await searchUsers({
        search: debouncedSearch,
      });

      if (active && response && response.users) {
        console.log(response);
        saveOptions(response.users);
      }
      setLoading(false);
    }

    searchAndSaveUsers();

    return () => {
      active = false;
    };
  }, [debouncedSearch]);

  // creates a combobox search which is dynamically updated with call's to the API
  return (
    <form
      onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
      }}
    >
      <Autocomplete
        id="asynchronous-search"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option: User, value: User) => option.username === value.username}
        getOptionLabel={(option) => option.username}
        options={options}
        loading={loading}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onInputChange={handleChange}
        inputValue={search}
        noOptionsText="No Users Found"
        freeSolo
        renderInput={(params) => (
          <div className={classes.search}>
            {/* //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore */}
            <InputBase
              {...params.inputProps}
              placeholder="Search"
              classes={{
                root: classes.searchRoot,
                input: classes.searchInput,
              }}
              inputProps={{
                'aria-label': 'search',
                ref: params.InputProps.ref,
              }}
              startAdornment={
                <Box display="flex" alignItems="center" justifyContent="center" className={classes.searchIcon}>
                  <SearchIcon />
                </Box>
              }
            />
          </div>
        )}
      />
    </form>
  );
};

export default Search;
