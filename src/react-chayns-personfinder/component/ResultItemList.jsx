import PropTypes from 'prop-types';
import React from 'react';
import LoadMore from './LoadMore';
import PersonFinderResultItem from './PersonFinderResultItem';
import WaitCursor from './WaitCursor';

const ResultItemList = ({
    data,
    hasMore,
    orm,
    group,
    showWaitCursor,
    onLoadMore,
    onClick,
    focusIndex,
    roundIcons,
    hideFriendsIcon,
    onRemoveTag,
    showCheckbox,
    tags,
    inputValue,
}) => {
    if (!data || data.length === 0) {
        return null;
    }

    return [
        data.map((item, index) => (
            <PersonFinderResultItem
                key={item[orm.identifier]}
                data={item}
                orm={orm}
                onClick={onClick}
                isFocused={focusIndex !== null && focusIndex === index}
                roundIcons={roundIcons}
                hideFriendsIcon={hideFriendsIcon}
                tags={tags}
                onRemoveTag={onRemoveTag}
                showCheckbox={showCheckbox}
                inputValue={inputValue}
            />
        )),
        hasMore && showWaitCursor && (
            <WaitCursor
                style={{
                    padding: '24px 0',
                }}
                key={`${group}-wait`}
            />
        ),
        onLoadMore && hasMore && (
            <LoadMore
                key={`${group}-more`}
                group={group}
                hide={showWaitCursor}
                onClick={onLoadMore}
            />
        ),
    ];
};

ResultItemList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    orm: PropTypes.shape({
        identifier: PropTypes.string,
        showName: PropTypes.string,
        imageUrl: PropTypes.string,
    }).isRequired,
    group: PropTypes.string,
    onLoadMore: PropTypes.func,
    showWaitCursor: PropTypes.bool,
    hasMore: PropTypes.bool,
    onClick: PropTypes.func,
    focusIndex: PropTypes.number,
    roundIcons: PropTypes.bool,
    hideFriendsIcon: PropTypes.bool,
    onRemoveTag: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.shape({}),
        })
    ),
    showCheckbox: PropTypes.bool,
    inputValue: PropTypes.string,
};

ResultItemList.defaultProps = {
    data: [],
    showWaitCursor: false,
    hasMore: false,
    onClick: null,
    group: 'default',
    onLoadMore: null,
    focusIndex: null,
    roundIcons: false,
    hideFriendsIcon: false,
    tags: [],
    showCheckbox: false,
    inputValue: '',
};

ResultItemList.displayName = 'ResultItemList';

export default ResultItemList;
